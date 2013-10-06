#
# pred-park.R,  6 Oct 13

BEGIN {
        FS=","
        dofw["monday"]=1
        dofw["tuesday"]=2
        dofw["wednesday"]=3
        dofw["thursday"]=4
        dofw["friday"]=5
        dofw["saturday"]=6
        dofw["sunday"]=7
        }

{
#print substr($3, 2, 11) "," $7 "," $8 "," $13 "," $17 "," $18
gsub(/"/, "", $0)

#print substr($3, 1, 10) "," dofw[tolower($4)] "," $7 "," $8 "," $13 "," $14

if (length($14) > 4) then
   print substr($3, 1, 10) "," dofw[tolower($4)] "," $7 "," $8 "," $13  >> "street/" $14
}

