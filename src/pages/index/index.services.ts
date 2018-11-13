const BaseUrl = "http://www.wx01-app.com";

/**
 * 页面处理类
 */
export default class HPage {
  dom: Document;
  parser: DOMParser;
  thumbs: Thumb[];
  tags: Tag[];
  constructor() {
    this.parser = new DOMParser();
    // this.init();
  }
  async init() {
    const html = await this.parseHtml();
    this.dom = this.parser.parseFromString(html, "text/html");
    this.thumbs = Thumb.parseByContent(this.dom.getElementById("content"));
    return this;
  }
  nextPage() {}
  /**
   * 转化对象
   */
  async parseHtml(url = BaseUrl) {
    const resp = await fetch(url);
    const data = await resp.text();
    return data;
  }
}

class Thumb {
  id: string;
  image: string;
  href: string;
  title: string;
  duration: string;
  constructor(thumbDom: any) {
    let aTag = thumbDom.getElementsByTagName("a");
    let img = thumbDom.getElementsByTagName("img")[0];
    this.id = thumbDom.getAttribute("id");
    this.href = aTag[0].getAttribute("href");
    this.image = img.getAttribute("data-src");
    this.title = aTag[1].getAttribute("title");
    this.duration = thumbDom.getElementsByClassName("duration")[0].innerHTML;
  }
  static parseByContent(contentDom): Thumb[] {
    let result;
    let dom_thumbs = contentDom.getElementById("content");
    if (dom_thumbs) {
      let arr = dom_thumbs.getElementsByClassName("thumb-block");
      arr.forEach(element => {
        result.push(new Thumb(element));
      });
    }
    return result;
  }
}

class Tag {
  constructor(dom: Document) {}
}
