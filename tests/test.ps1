class Calculator {
    Calculator() {
        Write-Host "Calculator instance created."
    }

    [int] Add($a, $b) {
        return $a + $b
    }

    [int] Subtract($a, $b) {
        return $a - $b
    }

    [int] Multiply($a, $b) {
        return $a * $b
    }
}

function Add($a, $b) {
    return $a + $b
}

function Subtract($a, $b) {
    return $a - $b
}

function Multiply($a, $b) {
    return $a * $b
}

function Main() {
    $result1 = Add 5 3
    $result2 = Subtract 8 2
    $result3 = Multiply 4 6

    Write-Host "Result 1: $result1"
    Write-Host "Result 2: $result2"
    Write-Host "Result 3: $result3"
}

Main
