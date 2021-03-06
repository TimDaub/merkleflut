// @format
import test from "ava";
import {
  serialize,
  gethash,
  HashTreeNode,
  extract,
  build
} from "../../src/models/merkle.mjs";

test("test if getting hash works", t => {
  const inp = "hello";
  const expected =
    "1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8";

  t.is(gethash(inp), expected);
});

test("if building a hashtree works", t => {
  const tree = new HashTreeNode(null, "hello");
  const branch1 = new HashTreeNode(tree, "world");
  t.is(
    branch1.hash,
    "400b9d0185590d56409028ee32dc58bfa7179a94940508cff983930f93031f2e"
  );
});

test("if serializing a hash tree works", t => {
  const tree = new HashTreeNode(null, "hello");
  const branch1 = new HashTreeNode(tree, "world");
  const branch2 = new HashTreeNode(branch1, "merkle tree");
  const branch3 = new HashTreeNode(tree, "alternative universe");

  t.deepEqual(extract(branch1), ["hello", "world"]);
  t.deepEqual(extract(branch2), ["hello", "world", "merkle tree"]);
  t.deepEqual(extract(branch3), ["hello", "alternative universe"]);
});

test("serializing a hash tree node", t => {
  const tree = new HashTreeNode(null, "hello");
  t.is(
    tree.serialize(),
    "null:hello:1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8"
  );

  const branch1 = new HashTreeNode(tree, "world");
  t.is(
    branch1.serialize(),
    "1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8:world:400b9d0185590d56409028ee32dc58bfa7179a94940508cff983930f93031f2e"
  );
});

test("serializing a tree branch", t => {
  const tree = new HashTreeNode(null, "hello");
  const branch1 = new HashTreeNode(tree, "world");

  const path = serialize(branch1);
  t.is(
    path,
    "null:hello:1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8/1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8:world:400b9d0185590d56409028ee32dc58bfa7179a94940508cff983930f93031f2e"
  );
});

test("building from a serialized tree", t => {
  const sTree =
    "null:hello:1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8/1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8:world:400b9d0185590d56409028ee32dc58bfa7179a94940508cff983930f93031f2e";
  const tree = new HashTreeNode(null, "hello");
  const branch1 = new HashTreeNode(tree, "world");

  const leaf = build(sTree);
  t.deepEqual(leaf, branch1);
  t.is(branch1.hash, leaf.hash);
});
