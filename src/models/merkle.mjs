// @format
import { Keccak } from "sha3";

const separators = {
  branch: "/",
  fragment: ":"
};

export class HashTreeNode {
  constructor(root, data) {
    this.root = root;
    this.data = data;

    if (root && root.hash) {
      this.hash = gethash(`${root.hash}:${data}`);
    } else {
      this.hash = gethash(data);
    }
  }

  serialize() {
    let root = null;
    if (this.root && this.root.hash) {
      root = this.root.hash;
    }
    return `${root}${separators.fragment}${this.data}${separators.fragment}${
      this.hash
    }`;
  }
}

export function serialize(leaf, path = []) {
  path.push(leaf.serialize());
  if (leaf.root) {
    return serialize(leaf.root, path);
  } else {
    return path.reverse().join(separators.branch);
  }
}

export function build(path, parentNode) {
  if (path.length === 0) {
    return parentNode;
  }

  const branches = path.split(separators.branch);
  const [root, data, hash] = branches[0].split(separators.fragment);
  branches.shift();
  path = branches.join(separators.branch);

  if (parentNode) {
    return build(path, new HashTreeNode(parentNode, data, hash));
  } else {
    return build(path, new HashTreeNode(null, data, hash));
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
