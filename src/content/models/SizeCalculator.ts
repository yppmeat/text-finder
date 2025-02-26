import { IRectangle } from './interfaces';

export default class SizeCalculator {
  public static calculate(node: Text | HTMLElement | SVGElement): IRectangle[] {
    if (node instanceof Text) {
      return this.calcTextSize(node);
    } else {
      return this.calcHTMLElementSize(node);
    }
  }

  private static calcTextSize(node: Text): IRectangle[] {
    const range = document.createRange();
    range.selectNodeContents(node);
    const rects = range.getClientRects();
    const rectsList = this.filterNonNewline(Array.from(rects));
    return this.validateDOMRects(rectsList);
  }

  private static filterNonNewline(domRects: DOMRect[]): DOMRect[] {
    return domRects.filter((domRect) => domRect.left < domRect.right);
  }

  private static calcHTMLElementSize(node: HTMLElement | SVGElement): IRectangle[] {
    const rect = node.getBoundingClientRect();
    return this.validateDOMRects([rect]);
  }

  private static validateDOMRects(rects: DOMRect[]): IRectangle[] {
    return rects.map(this.validateDOMRect.bind(this));
  }

  private static validateDOMRect(rect: DOMRect): IRectangle {
    return {
      top: this.fixed(rect.top),
      left: this.fixed(rect.left),
      width: this.fixed(rect.width),
      height: this.fixed(rect.height),
    };
  }

  private static fixed(num: number): number {
    return Math.floor(num * 1000) / 1000;
  }
}
