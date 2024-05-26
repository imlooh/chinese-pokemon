$(document).ready(function() {
    var output = "";

    $("#add").click(function() {
        next();
    });

    $("#clear").click(function() {
        clear();
    });

    function clear() {
        output = "";
        $("input").val("");
        $("#output").val("").text("");
        $("#id").focus();  
    }

    function next() {
        let id = $("#id").val();
        let name = $("#name").val();
        let trad = $("#chineseTraditional").val();
        let simp = $("#chineseSimplified").val();
        let pinyin = $("#pinyin").val();
        let jyutping = $("#jyutping").val();
        let other = $("#other").val();
        let japanese = $("#japanese").val();
        let data = $("#data").val();

        output += `{
    "id": "${id}",
    "name": "${name}",
    "chineseTraditional": "${trad}",
    "chineseSimplified": "${simp}",
    "pinyin": "${pinyin}",
    "jyutping": "${jyutping}",
    "other": "${other}",
    "japanese": "${japanese}",
    "data": "${data}"
},`;

        $("#output").val(output).text(output);
        $("#output").select().focus(function() {
            document.execCommand("copy");
        });
    }
});