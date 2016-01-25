/**
 * The BarcodeReader class
 *
 * Copyright (c) 2012, smolowik at gmail.com
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 * - Neither the name of the smolowik.eu nor the names of its contributors
 *   may be used to endorse or promote products derived from this software
 *   without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * @module BarcodeReader
 * @author Aleksander Smołowik <aleksander@smolowik.eu>
 * @description Code scanning with USB reader in JavaScript.
 * @link http://code.google.com/p/nativ-js-barcodereader/
 *
 */
var BarcodeReader = {
  STAMP : 0,
  DATA: '',
  TIMEOUT: null,
  start : function () {
    BarcodeReader.STAMP = BarcodeReader.getTimestamp();
    document.onkeypress = function (e) {
      clearTimeout(BarcodeReader.TIMEOUT);
      var code = e.which;
      var character = String.fromCharCode(code);
      var diffrence = BarcodeReader.getTimestamp() - BarcodeReader.STAMP;
      BarcodeReader.STAMP = BarcodeReader.getTimestamp();
      // jezeli roznica w czasie jest wieksza niz 50 milisekund to zerujemy dane
      if (diffrence > 50) {
        BarcodeReader.DATA = '';
      }
      BarcodeReader.DATA += character;
      BarcodeReader.TIMEOUT = setTimeout(function(){
        if (BarcodeReader.DATA.length > 5) {
          BarcodeReader.barcodeReaded(BarcodeReader.DATA);
        }
      },100);
    }
  },
  getTimestamp : function () {
    var d = new Date();
    return d.getTime();
  },
  barcodeReaded : function (code) {
    alert('barcode ' + code);
  }
}
