// Note transposer in F# code
// Just hard coded at the moment, as I haven't worked out how to use command line arguments
//
// To Compile:
// $ fsharps transpose.fs
//
// To Run:
// $ mono fsharp.exe
//
// Well, that's how it's done on Mac anyway

printfn "Welcome to Humphreys Chord transposer"

let TransposeNote note semitones style =

    let allNotes = [
        "B#", 0
        "C",  0
        "C#", 1 
        "Db", 1
        "D",  2
        "D#", 3 
        "Eb", 3
        "E",  4
        "E#", 5
        "Fb", 4
        "F",  5
        "F#", 6 
        "Gb", 6
        "G",  7
        "G#", 8 
        "Ab", 8
        "A",  9
        "A#", 10 
        "Bb", 10
        "Cb", 11
        "B",  11
    ]
    let allNotesDict = dict allNotes
    let styleNotes = 
        match style with
        | "b" -> ["C"; "Db"; "D"; "Eb"; "E"; "F"; "Gb"; "G"; "Ab"; "A"; "Bb"; "B"]
        | _ -> ["C"; "C#"; "D"; "D#"; "E"; "F"; "F#"; "G"; "G#"; "A"; "A#"; "B"]

    let NoteValue c = 
        match allNotesDict.TryGetValue(c) with
        | true, v -> v
        | _ -> failwith (sprintf "The note '%s' was not in lookup table" c)

    let AddMod12 a = (a + semitones) % 12

    let NoteAt i =
        styleNotes |> Seq.item i

    NoteValue note |> AddMod12 |> NoteAt

printfn "C transposed by +5 is %s" (TransposeNote "C" 5 "#")
printfn "D transposed by -2 is %s" (TransposeNote "D" -2 "#")
printfn "A transposed by +1 is %s" (TransposeNote "A" 1 "b")

