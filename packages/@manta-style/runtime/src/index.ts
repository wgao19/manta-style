import { Type, Literals } from "./utils";
import NumberKeyword from "./types/NumberKeyword";
import BooleanKeyword from "./types/BooleanKeyword";
import UndefinedKeyword from "./types/UndefinedKeyword";
import NullKeyword from "./types/NullKeyword";
import TypeLiteral from "./types/TypeLiteral";
import ArrayType from "./types/ArrayType";
import LiteralType from "./types/LiteralType";
import UnionType from "./types/UnionType";
import AnyKeyword from "./types/AnyKeyword";
import NeverKeyword from "./types/NeverKeyword";
import StringKeyword from "./types/StringKeyword";
import TypeReference from "./types/TypeReference";
import TypeAliasDeclaration from "./nodes/TypeAliasDeclaration";

class MantaStyle {
  private static typeReferences: { [key: string]: TypeAliasDeclaration } = {};
  public static _registerType(name: string, type: TypeAliasDeclaration) {
    if (MantaStyle.typeReferences[name]) {
      throw new Error(`Type "${name}" has already been registered.`);
    } else {
      MantaStyle.typeReferences[name] = type;
    }
  }
  public static _referenceType(name: string): TypeAliasDeclaration {
    if (!MantaStyle.typeReferences[name]) {
      throw new Error(`Type "${name}" hasn't been registered yet.`);
    } else {
      return MantaStyle.typeReferences[name];
    }
  }
  public static TypeAliasDeclaration(
    typeName: string,
    typeCallback: (currentType: TypeAliasDeclaration) => Type
  ) {
    const newType = new TypeAliasDeclaration(typeName);
    newType.setType(typeCallback(newType));
    return newType;
  }
  public static TypeLiteral() {
    return new TypeLiteral();
  }
  public static UnionType(types: Type[]) {
    return new UnionType(types);
  }
  public static LiteralType(literal: Literals) {
    return new LiteralType(literal);
  }
  public static ArrayType(elementType: Type) {
    return new ArrayType(elementType);
  }
  public static TypeReference(referenceName: string) {
    return new TypeReference(referenceName);
  }
  public static NumberKeyword = new NumberKeyword();
  public static BooleanKeyword = new BooleanKeyword();
  public static StringKeyword = new StringKeyword();
  public static NeverKeyword = new NeverKeyword();
  public static NullKeyword = new NullKeyword();
  public static UndefinedKeyword = new UndefinedKeyword();
  public static AnyKeyword = new AnyKeyword();
  public static KeyOfKeyword(type: TypeLiteral) {
    const keys = type.getKeys();
    return new UnionType(keys.map(key => new LiteralType(key)));
  }
}

export default MantaStyle;
