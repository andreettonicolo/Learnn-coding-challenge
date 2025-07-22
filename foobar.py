# FOOBAR - Problema di programmazione
# Stampa numeri da 1 a 100 con sostituzioni:
# - Multipli di 3: "Foo"
# - Multipli di 5: "Bar"
# - Multipli di 3 e 5: "FooBar"

for numero in range(1, 101):
    if numero % 3 == 0 and numero % 5 == 0:
        print("FooBar")
    elif numero % 3 == 0:
        print("Foo")
    elif numero % 5 == 0:
        print("Bar")
    else:
        print(numero)