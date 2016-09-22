(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "fable-core"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("fable-core"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.fableCore);
    global.transpose = mod.exports;
  }
})(this, function (exports, _fableCore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TransposeNote = TransposeNote;

  _fableCore.String.fsFormat("Welcome to Humphreys Chord transposer")(function (x) {
    console.log(x);
  });

  function TransposeNote(note, semitones, style) {
    var allNotes = _fableCore.List.ofArray([["B#", 0], ["C", 0], ["C#", 1], ["Db", 1], ["D", 2], ["D#", 3], ["Eb", 3], ["E", 4], ["E#", 5], ["Fb", 4], ["F", 5], ["F#", 6], ["Gb", 6], ["G", 7], ["G#", 8], ["Ab", 8], ["A", 9], ["A#", 10], ["Bb", 10], ["Cb", 11], ["B", 11]]);

    var allNotesDict = new Map(allNotes);
    var styleNotes = style === "b" ? _fableCore.List.ofArray(["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]) : _fableCore.List.ofArray(["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]);

    var NoteValue = function NoteValue(c) {
      var matchValue = allNotesDict.has(c) ? [true, allNotesDict.get(c)] : [false, 0];

      if (matchValue[0]) {
        return matchValue[1];
      } else {
        throw _fableCore.String.fsFormat("The note '%s' was not in lookup table")(function (x) {
          return x;
        })(c);
      }
    };

    var AddMod12 = function AddMod12(a) {
      return (a + semitones) % 12;
    };

    var NoteAt = function NoteAt(i) {
      return function (source) {
        return _fableCore.Seq.item(i, source);
      }(styleNotes);
    };

    return NoteAt(AddMod12(NoteValue(note)));
  }

  _fableCore.String.fsFormat("C transposed by +5 is %s")(function (x) {
    console.log(x);
  })(TransposeNote("C", 5, "#"));

  _fableCore.String.fsFormat("D transposed by -2 is %s")(function (x) {
    console.log(x);
  })(TransposeNote("D", -2, "#"));

  _fableCore.String.fsFormat("A transposed by +1 is %s")(function (x) {
    console.log(x);
  })(TransposeNote("A", 1, "b"));
});