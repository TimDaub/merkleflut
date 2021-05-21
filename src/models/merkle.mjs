// @format
import { Keccak } from "sha3";

export class HashTreeNode {
  constructor(root, data) {
    this.root = root;
    this.data = data;

    if (root) {
      this.hash = gethash(`${root.hash}:${data}`);
    } else {
      this.hash = gethash(data);
    }
  }
}

export function extract(leaf, sequence = []) {
  sequence.push(leaf.data);

  if (leaf.root) {
    return extract(leaf.root, sequence);
  } else {
    return sequence.reverse();
  }
}

export function gethash(data) {
  const hashfn = new Keccak(256);
  hashfn.update(data);
  return hashfn.digest("hex");
}
