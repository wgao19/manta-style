import { Type, ErrorType } from "../utils";

export default class TypeParameter extends Type {
  private name: string;
  private actualType: Type;
  constructor(name: string) {
    super();
    this.actualType = new ErrorType(
      `Generic type parameter "${name}" have not been initialized. `
    );
    this.name = name;
  }
  public getTypeParameterName() {
    return this.name;
  }
  public setActualType(type: Type) {
    this.actualType = type;
  }
  public getActualType() {
    return this.actualType;
  }
  public mock() {
    return this.actualType.mock();
  }
  public validate(input: any) {
    return this.actualType.validate(input);
  }
}