import input from './input';
import firstNumber from './getFirstNumber';
import lastNumber from './getLastNumber'

const lines = input.split(/\n/g);



console.log(
lines
  .map(l => parseInt(`${firstNumber(l)}${lastNumber(l)}`))
  .reduce((a, b) => a + b)
)

/*
for (const l of `3fiveone
eightnineseventwo1seven
9h1xcrcggtwo38
nine4pvtl
seven7rsbqpgxtjzsgxssix
twofivethreepqgsvrszczrthree7
44qcrkvr1two
zstrmphtxdvdpsnhpnq4threenbjznsb
bhgxhb41eight
qhstsbxsspsrfourmtvtnfhxlj699one
onekvhgkeighteight6two7ninelnfzbr
xsixz5six3gfqrzmpnjgskd6
qfrpksmzzvfkddtfh6838
mztttgnxdqt4
8threesevenfourgbgteight5twonenjr
bpzkn2rbbjtdtlznl
glckqhjsbsznseight5dtnxnsix7
2shd3ksrtmbs62vvdvhd
9ninemdkkqjzjfour9mzspzjgmlhfq
7twoqjbshcfxldnkc33one83
zstxvfdthreeseven7mdfpgzgfourdfshplvqflfprt1
9mndn31msfprm1kpk
tmczplnmrsevenhmhprtllcktpr8eight9
49nine29917five
6qspssvm8
7fourninefourcpfgpmxqjsjxmjfntwonine
3nxfjmzhseven22one
tzgnljxhs9nine1lvqgsix9four
eightthree9eightfourninexl6gsdhljppfb
9g
2xlcvqrxs2eightznzdghnlvcfour8xbzk
xgmfqvdbsn7sixnineseven5
65zsghsnfbseven9
7skmb5
dbvjtf294threefournine
21hbtcfzbjhsbxlhd
27four
jlrthree9four8fourhqnsevenxqlmtsmzt
gjppzpvglfsvdmonercrsn4
3zzxmhc
ldfgpzjmtcbj3jvsltltjv1eightzrdczhrzpcssrsrxbj
szblqqfgxhxkk3fourvqnpzf1onesixthree
vsb37three
8kxdcgmpb2sevenjdvc3eight7
kgrsmfghvfivemhxnfiveqzzspmgmsvvghzd1fzcrkzdfsb
5mphlhx5dmcxxcpcxsrdzdninethree
hmqdkgvk4twoeight
2rjxxdcgtq5fivehzslfc
srqzfsvpfbnsvninetwothree6sixppsmfrtcrxxth
4fourtwocdxnzkbznnrf
4six419qpqfvfdpcrqvsjhgsfgrkpfmphseven
hxdcttl72seven
qkoneighttwoonesixeightfive2tzmrtpcthreefour
bnjqlftwobvsvjqptdp1two94twonej
eightninetwo278prrbvmcmf
seven79two
one9bx
cfpbdmjbcd27sixfour
16snbjgjzqxzplxkkclpxzdx
3scbbonenine5fivethreenine
21sixsix68oneninefour
6ninejmtrp4fivekxgdgj
6mhlddxbshqbseventhree3two6six
7four8smntchbmj71oneeight6
six25four196one2
2foursixftdbhbtd6
fourfonekfsxdgvglvtrnrrjzmmkzxljm3
3xckjzm
six9ssvkh1hdxcxmsptlxgdd8eight
2eightfourone2ninezslhqhdlcp2qxv
7oneclztx7xsxhrhhggfbhzdfgkdfvsqjskmdzj
fouronekkxqtrkptqz8
klccbbvbjsix3fivenine
rjrxdxdz33nine
sevenninen5`.split('\n')){
  console.log(l)
  console.log(getFirstNumber(l))
  console.log(getLastNumber(l))
}

 */