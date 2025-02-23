import { INodeData } from './interfaces';
import SizeCalculator from './SizeCalculator';

interface IPosition {
  x: number;
  y: number;
}

export default class NodeFinder {
  private static readonly instance = new NodeFinder();
  public static getInstance(): NodeFinder {
    return this.instance;
  }

  private static ignoreTags = new Set(['IFRAME', 'NOSCRIPT', 'SCRIPT', 'TEXTAREA']);
  private nodes: INodeData[];

  private constructor() {
    this.nodes = [];
  }

  private getRoot(): HTMLElement | null {
    return document.querySelector('div#app > main');
  }

  public findNodes(): INodeData[] {
    this.nodes.length = 0;
    const root = this.getRoot();
    if (!root) return [];

    this.recursive(root);

    console.log(this.nodes);
    return this.nodes;
  }

  private recursive(node: Node): void {
    if (node instanceof Text) {
      this.checkText(node);
    } else if (node instanceof HTMLElement) {
      this.checkElement(node);
      if (NodeFinder.ignoreTags.has(node.tagName)) {
        return;
      }

      node.childNodes.forEach((childNode) => {
        this.recursive(childNode);
      });
    } else if (node instanceof SVGElement) {
      this.checkTitle(node);
    }
  }

  private checkText(node: Text): void {
    if (this.isNonEmptyString(node.nodeValue!) && this.checkVisible(node.parentElement!)) {
      this.addNodeMetadata(node);
    }
  }

  private isNonEmptyString(value: string): boolean {
    return value.trim().length > 0;
  }

  private checkElement(node: HTMLElement): void {
    if (this.hasAttribute(node) && this.checkVisible(node)) {
      this.addNodeMetadata(node);
    }
  }

  private checkTitle(node: SVGElement): void {
    if (this.hasTitleElement(node) && this.checkVisible(node)) {
      this.addSVGTitleMetadata(node, this.getTitleElement(node)!);
    }
  }

  private hasTitleElement(node: SVGElement): boolean {
    return this.getTitleElement(node) !== null;
  }

  private getTitleElement(node: SVGElement): HTMLElement | null {
    return node.querySelector<HTMLElement>(':scope > title');
  }

  private hasAttribute(node: HTMLElement): boolean {
    return node.hasAttribute('title') || node.hasAttribute('placeholder');
  }

  private checkVisible(node: HTMLElement | SVGElement): boolean {
    return this.isVisible(node) && this.isElementInFront(node);
  }

  private isVisible(node: HTMLElement | SVGElement): boolean {
    // 要素がdisplay:noneの場合もwidthとheightが0になる
    const rect = node.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  private isElementInFront(node: HTMLElement | SVGElement): boolean {
    const centerPos = this.calcCenterPos(node);
    const element = document.elementFromPoint(centerPos.x, centerPos.y);
    if (!element) return false;
    
    return this.getAncestors(element).includes(node);
  }

  private getAncestors(node: Element): Element[] {
    const ancestors: Element[] = [];
    let current: Element | null = node;

    while (current) {
      ancestors.unshift(current);
      current = current.parentElement;
    }
    return ancestors;
  }

  private calcCenterPos(node: HTMLElement | SVGElement): IPosition {
    const { left, top, width, height } = node.getBoundingClientRect();

    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  }

  private addNodeMetadata(node: Node): void {
    if (node instanceof Text) {
      this.addTextMetadata(node);
    } else if (node instanceof HTMLElement) {
      this.addHTMLElementMetadata(node);
    }
  }

  private addSVGTitleMetadata(svg: SVGElement, title: HTMLElement): void {
    this.nodes.push({
      target: svg,
      title: null,
      placeholder: null,
      textContent: title.textContent!,
      sizes: SizeCalculator.calculate(svg),
    });
  }

  private addTextMetadata(node: Text): void {
    this.nodes.push({
      target: node,
      title: null,
      placeholder: null,
      textContent: node.nodeValue,
      sizes: SizeCalculator.calculate(node),
    });
  }

  private addHTMLElementMetadata(node: HTMLElement): void {
    this.nodes.push({
      target: node,
      title: node.getAttribute('title'),
      placeholder: node.getAttribute('placeholder'),
      textContent: null,
      sizes: SizeCalculator.calculate(node),
    });
  }
}
