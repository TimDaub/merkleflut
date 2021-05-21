# merkleflut

> Merkle-flut is a generative multi-medial storytelling machine.

## installation

```bash
$ npm i
$ npm dev
```

## system design

### data model

merkleflut uses a hash tree to authenticate stored data. The diagram shows that within a branch's story, time flows towards the leaves, while authentication can only be verified towards the root.

![](./assets/datamodel.png)

## license

see LICENSE file.
