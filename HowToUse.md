How to use:
attach javascript library, and write:

```

BarcodeReader.start();
BarcodeReader.barcodeReaded = function (code) {
console.log('barcode ' + code);
}
```