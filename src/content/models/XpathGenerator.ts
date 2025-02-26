export default class XPathGenerator {
  private static INSTANCE: XPathGenerator = new XPathGenerator();
  public static getInstance(): XPathGenerator {
    return this.INSTANCE;
  }

  private classNamePattern = /^e[a-z0-9]+\d$/;
  private target!: Node;

  public generate(target: Node): string {
    this.target = target;
    const path = this.createPath();
    console.log(path);

    return this.getXPath(path);
  }

  private createPath(): Node[] {
    const root = document.querySelector('div#app > main')!;

    const path: Node[] = [];
    let current: Node = this.target;
    while (current !== root) {
      path.unshift(current);
      current = current.parentNode!;
    }
    return path;
  }

  private getXPath(path: Node[]): string {
    return path.map(this.getPartialXPath.bind(this)).join('');
  }

  private getPartialXPath(node: Node): string {
    if (node instanceof Text) {
      return this.getPartialTextXPath(node);
    } else {
      return this.getPartialElementXPath(node as Element);
    }
  }

  private getPartialTextXPath(node: Text): string {
    const siblings = this.getChildTextNodes(node.parentElement!);
    const index = siblings.indexOf(node);
    return `/text()[${index + 1}]`;
  }

  private getPartialElementXPath(node: Element): string {
    const tagName = node.tagName.toLowerCase();
    const className = this.getUniqueClassName(node);
    const siblings = this.getChildElements(node.parentElement!, tagName, className);

    if (node.id !== '') {
      return `//${tagName}#${node.id}`;
    }

    const index = siblings.indexOf(node);
    if (className) {
      return `/${tagName}.${className}[${index + 1}]`;
    }
    return `/${tagName}[${index + 1}]`;
  }

  private getChildTextNodes(node: Element): Text[] {
    return [...node.childNodes].filter((child) => child instanceof Text);
  }

  private getChildElements(node: Element, tagName: string, className?: string): Element[] {
    console.log(node, node.children, tagName, className);
    return [...node.children].filter(
      (child) =>
        child.tagName.toLowerCase() === tagName &&
        (className ? child.classList.contains(className) : true)
    );
  }

  private getUniqueClassName(node: Element): string | undefined {
    const classNames = [...node.classList];
    const uniqueClassName = classNames.find((className) => this.classNamePattern.test(className));

    return uniqueClassName;
  }
}
