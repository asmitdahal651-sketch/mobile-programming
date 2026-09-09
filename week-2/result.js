function result(event)
{
    event.preventDefault();

    let Geography = Number(document.getElementById("geography").value);
    let Physics = Number(document.getElementById("physics").value);
    let Chemistry = Number(document.getElementById("chemistry").value);
    let English = Number(document.getElementById("english").value);
    let Nepali = Number(document.getElementById("nepali").value);
    let Maths = Number(document.getElementById("maths").value);
    let Programming = Number(document.getElementById("programming").value);
    let Tech = Number(document.getElementById("tech").value);

    if (Geography < 0 || Geography > 100 ||
        Physics < 0 || Physics > 100 ||
        Chemistry < 0 || Chemistry > 100 ||
        English < 0 || English > 100 ||
        Nepali < 0 || Nepali > 100 ||
        Maths < 0 || Maths > 100 ||
        Programming < 0 || Programming > 100 ||
        Tech < 0 || Tech > 100)
    {
        document.getElementById("result").innerHTML = "Marks must be between 0 and 100";
        document.getElementById("result").style.color = "red";
        return;
    }

    let total = Geography + Physics + Chemistry + English + Nepali + Maths + Programming + Tech;

  

    printResult(total);
}

function printResult(total)
{
    let pass = false;

    if (total >= 700)
    {
        document.getElementById("total").innerHTML ="Total Marks: " + total + "<br>It is Distinction";
        pass = true;
    }
    else if (total >= 600)
    {
        document.getElementById("total").innerHTML ="Total Marks: " + total + "<br>It is First Division";
        pass = true;
    }
    else if (total >= 500)
    {
        document.getElementById("total").innerHTML ="Total Marks: " + total + "<br>It is Second Division";
        pass = true;
    }
    else if (total >= 400)
    {
        document.getElementById("total").innerHTML ="Total Marks: " + total + "<br>It is Third Division";
        pass = true;
    }
    else
    {
        document.getElementById("total").innerHTML ="Total Marks: " + total + "<br>It is Fail";
        pass = false;
    }

    if (pass)
    {
        document.getElementById("result").innerHTML = "Result: Pass";
        document.getElementById("result").style.color = "green";
    }
    else
    {
        document.getElementById("result").innerHTML = "Result: Fail";
        document.getElementById("result").style.color = "red";
    }
}