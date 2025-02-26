export interface IRectangle {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface INodeData {
  target: HTMLElement | SVGElement | Text;
  title: string | null;
  placeholder: string | null;
  textContent: string | null;
  sizes: IRectangle[];
}
