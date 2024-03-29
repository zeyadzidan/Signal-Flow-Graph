import Konva from "Konva";
import Factory from "./Factory";

class Arrow {
  shape1!: Factory;
  shape2!: Factory;
  layer!: Konva.Layer;
  arrow!: Konva.Group;
  type!: String;
  sh1!: Konva.Group;
  sh2!: Konva.Group;

  constructor(
    layer: Konva.Layer,
    shape1: Factory,
    shape2: Factory,
    text: string
  ) {
    var id1 = shape1.ID;
    var id2 = shape2.ID;
    if (shape1.out.find((x) => x == id2) != undefined) {
      alert("Invalid Arrow");
      return;
    }

    this.shape1 = shape1;
    this.shape2 = shape2;
    this.layer = layer;
    if (shape1 == shape2) {
      this.arrow = this.ArrowS(text);
      this.type = "self";
    } else if (id1.charAt(1) > id2.charAt(1)) {
      this.arrow = this.ArrowL(text);
      this.type = "lower";
    } else if (shape1.out.length) {
      this.arrow = this.ArrowU(text);
      this.type = "upper";
    } else {
      this.arrow = this.Arrow(text);
      this.type = "normal";
    }

    shape1.out.push(id2);
    shape2.inn.push(id1);
    layer.add(this.arrow);
    this.arrow.moveToBottom();
    this.layer.draw();

    shape1.arrows.push(this);
    shape2.arrows.push(this);
  }

  Arrow(text: string) {
    this.sh1 = this.shape1.machineGroup;
    this.sh2 = this.shape2.machineGroup;
    let pos = this.getShorterBath();
    let pos1 = pos[0];
    let pos2 = pos[1];

    var shp = new Konva.Group({});
    var arrow = new Konva.Arrow({
      points: [pos1.x, pos1.y, pos2.x, pos2.y],
      pointerLength: 10,
      pointerWidth: 10,
      fill: "black",
      stroke: "black",
      strokeWidth: 4,
    });
    shp.add(
      new Konva.Text({
        x: (pos1.x + pos2.x) / 2,
        y: (pos1.y + pos2.y) / 2 - 40,
        text: text,
        fontSize: 30,
        fontStyle: "bold",
        fontFamily: "Calibri",
        fill: "#000",
        padding: 5,
        align: "center",
        name: "Machine",
      })
    );
    shp.add(arrow);
    return shp;
  }

  getShorterBath() {
    let pos1 = this.sh1.getAbsolutePosition();
    let pos2 = this.sh2.getAbsolutePosition();
    let short = 10000;
    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 4; j++) {
        var s = "." + i;
        var k = "." + j;
        let p1 = this.sh1.findOne(s).getAbsolutePosition();
        let p2 = this.sh2.findOne(k).getAbsolutePosition();
        var d = Math.sqrt(
          (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
        );
        if (d < short) {
          pos1 = p1;
          pos2 = p2;
          short = d;
        }
      }
    }
    return [pos1, pos2];
  }

  getShorterBathS() {
    let pos1 = this.sh1.getAbsolutePosition();
    let pos2 = this.sh2.getAbsolutePosition();
    let short = 10000;
    var s = "." + 4;
    var k = "." + 4;
    let p1 = this.sh1.findOne(s).getAbsolutePosition();
    let p2 = this.sh2.findOne(k).getAbsolutePosition();
    var d = Math.sqrt(
      (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
    );
    if (d < short) {
      pos1 = p1;
      pos2 = p2;
      short = d;
    }
    return [pos1, pos2];
  }

  getShorterBathU() {
    let pos1 = this.sh1.getAbsolutePosition();
    let pos2 = this.sh2.getAbsolutePosition();
    let short = 10000;
    var s = "." + 2;
    var k = "." + 2;
    let p1 = this.sh1.findOne(s).getAbsolutePosition();
    let p2 = this.sh2.findOne(k).getAbsolutePosition();
    var d = Math.sqrt(
      (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
    );
    if (d < short) {
      pos1 = p1;
      pos2 = p2;
      short = d;
    }
    return [pos1, pos2];
  }

  getShorterBathL() {
    let pos1 = this.sh1.getAbsolutePosition();
    let pos2 = this.sh2.getAbsolutePosition();
    let short = 10000;
    var s = "." + 1;
    var k = "." + 1;
    let p1 = this.sh1.findOne(s).getAbsolutePosition();
    let p2 = this.sh2.findOne(k).getAbsolutePosition();
    var d = Math.sqrt(
      (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
    );
    if (d < short) {
      pos1 = p1;
      pos2 = p2;
      short = d;
    }
    return [pos1, pos2];
  }

  public update() {
    switch (this.type) {
      case "self":
        this.updateS();
        break;
      case "lower":
        this.updateL();
        break;
      case "upper":
        this.updateU();
        break;
      case "normal":
        this.updateN();
        break;
    }
  }

  ArrowS(text: string) {
    this.sh1 = this.shape1.machineGroup;
    this.sh2 = this.shape2.machineGroup;
    let pos = this.getShorterBathS();
    let pos1 = pos[0];
    var shp = new Konva.Group({});
    shp.add(
      new Konva.Line({
        points: [pos1.x, pos1.y, pos1.x - 20, pos1.y - 20],
        pointerLength: 10,
        pointerWidth: 10,
        fill: "black",
        stroke: "black",
        strokeWidth: 4,
      })
    );
    shp.add(
      new Konva.Line({
        points: [pos1.x - 20, pos1.y - 20, pos1.x + 20, pos1.y - 60],
        pointerLength: 10,
        pointerWidth: 10,
        fill: "black",
        stroke: "black",
        strokeWidth: 4,
      })
    );
    shp.add(
      new Konva.Line({
        points: [pos1.x + 20, pos1.y - 60, pos1.x + 60, pos1.y - 20],
        pointerLength: 10,
        pointerWidth: 10,
        fill: "black",
        stroke: "black",
        strokeWidth: 4,
      })
    );
    shp.add(
      new Konva.Arrow({
        points: [pos1.x + 60, pos1.y - 20, pos1.x + 40, pos1.y],
        pointerLength: 10,
        pointerWidth: 10,
        fill: "black",
        stroke: "black",
        strokeWidth: 4,
      })
    );
    shp.add(
      new Konva.Text({
        x: pos1.x - 10,
        y: pos1.y - 90,
        text: text,
        fontSize: 30,
        fontStyle: "bold",
        fontFamily: "Calibri",
        fill: "#000",
        padding: 5,
        align: "center",
        name: "Machine",
      })
    );
    return shp;
  }

  ArrowU(text: string) {
    this.sh1 = this.shape1.machineGroup;
    this.sh2 = this.shape2.machineGroup;
    let pos = this.getShorterBathU();
    let pos1 = pos[0];
    let pos2 = pos[1];
    let x = (pos1.x + pos2.x) / 2;
    let y = -100;
    var shp = new Konva.Group({});
    shp.add(
      new Konva.Arrow({
        points: [x, pos1.y + y, pos2.x, pos2.y],
        pointerLength: 10,
        pointerWidth: 10,
        fill: "black",
        stroke: "black",
        strokeWidth: 4,
      })
    );
    shp.add(
      new Konva.Line({
        points: [pos1.x, pos1.y, x, pos1.y + y],
        pointerLength: 10,
        pointerWidth: 10,
        fill: "black",
        stroke: "black",
        strokeWidth: 4,
      })
    );
    shp.add(
      new Konva.Text({
        x: x - 30,
        y: pos1.y + y - 40,
        text: text,
        fontSize: 30,
        fontStyle: "bold",
        fontFamily: "Calibri",
        fill: "#000",
        padding: 5,
        align: "center",
        name: "Machine",
      })
    );
    return shp;
  }

  ArrowL(text: string) {
    this.sh1 = this.shape1.machineGroup;
    this.sh2 = this.shape2.machineGroup;
    let pos = this.getShorterBathL();
    let pos1 = pos[0];
    let pos2 = pos[1];
    let x = (pos1.x + pos2.x) / 2;
    let y = 100;
    var shp = new Konva.Group({});
    shp.add(
      new Konva.Arrow({
        points: [x, pos1.y + y, pos2.x, pos2.y],
        pointerLength: 10,
        pointerWidth: 10,
        fill: "black",
        stroke: "black",
        strokeWidth: 4,
      })
    );
    shp.add(
      new Konva.Line({
        points: [pos1.x, pos1.y, x, pos1.y + y],
        pointerLength: 10,
        pointerWidth: 10,
        fill: "black",
        stroke: "black",
        strokeWidth: 4,
      })
    );
    shp.add(
      new Konva.Text({
        x: x - 30,
        y: pos1.y + y,
        text: text,
        fontSize: 30,
        fontStyle: "bold",
        fontFamily: "Calibri",
        fill: "#000",
        padding: 5,
        align: "center",
        name: "Machine",
      })
    );
    return shp;
  }

  public updateU() {
    let pos = this.getShorterBathU();
    let pos1 = pos[0];
    let pos2 = pos[1];
    var p1 = [pos1.x, pos1.y, (pos1.x + pos2.x) / 2, pos1.y - 100];
    var p2 = [(pos1.x + pos2.x) / 2, pos1.y - 100, pos2.x, pos2.y];
    var arrow = this.arrow.getChildren(function (node) {
      return node.getClassName() === "Arrow";
    });
    var line = this.arrow.getChildren(function (node) {
      return node.getClassName() === "Line";
    });
    var text = this.arrow.getChildren(function (node) {
      return node.getClassName() === "Text";
    });
    line[0].setAttr("points", p1);
    arrow[0].setAttr("points", p2);
    text[0].setAttr("x", (pos1.x + pos2.x) / 2 - 30);
    text[0].setAttr("y", pos1.y - 140);
    this.layer.draw();
  }
  public updateL() {
    let pos = this.getShorterBathL();
    let pos1 = pos[0];
    let pos2 = pos[1];
    var p1 = [pos1.x, pos1.y, (pos1.x + pos2.x) / 2, pos1.y + 100];
    var p2 = [(pos1.x + pos2.x) / 2, pos1.y + 100, pos2.x, pos2.y];
    var arrow = this.arrow.getChildren(function (node) {
      return node.getClassName() === "Arrow";
    });
    var line = this.arrow.getChildren(function (node) {
      return node.getClassName() === "Line";
    });
    var text = this.arrow.getChildren(function (node) {
      return node.getClassName() === "Text";
    });
    line[0].setAttr("points", p1);
    arrow[0].setAttr("points", p2);
    text[0].setAttr("x", (pos1.x + pos2.x) / 2 - 30);
    text[0].setAttr("y", pos1.y + 100);
    this.layer.draw();
  }

  public updateN() {
    let pos = this.getShorterBath();
    let pos1 = pos[0];
    let pos2 = pos[1];
    var p = [pos1.x, pos1.y, pos2.x, pos2.y];
    var arrow = this.arrow.getChildren(function (node) {
      return node.getClassName() === "Arrow";
    });
    var text = this.arrow.getChildren(function (node) {
      return node.getClassName() === "Text";
    });
    arrow[0].setAttr("points", p);
    text[0].setAttr("x", (pos1.x + pos2.x) / 2);
    text[0].setAttr("y", (pos1.y + pos2.y) / 2 - 40);
    this.layer.draw();
  }
  public updateS() {
    let pos = this.getShorterBathS();
    let pos1 = pos[0];
    let pos2 = pos[1];
    var p1 = [pos1.x, pos1.y, pos1.x - 20, pos1.y - 20];
    var p2 = [pos1.x - 20, pos1.y - 20, pos1.x + 20, pos1.y - 60];
    var p3 = [pos1.x + 20, pos1.y - 60, pos1.x + 60, pos1.y - 20];
    var p4 = [pos1.x + 60, pos1.y - 20, pos1.x + 40, pos1.y];
    var arrow = this.arrow.getChildren(function (node) {
      return node.getClassName() === "Arrow";
    });
    var line = this.arrow.getChildren(function (node) {
      return node.getClassName() === "Line";
    });
    var text = this.arrow.getChildren(function (node) {
      return node.getClassName() === "Text";
    });
    line[0].setAttr("points", p1);
    line[1].setAttr("points", p2);
    line[2].setAttr("points", p3);
    arrow[0].setAttr("points", p4);
    text[0].setAttr("x", pos1.x - 10);
    text[0].setAttr("y", pos1.y - 90);
    this.layer.draw();
  }
}
export default Arrow;
