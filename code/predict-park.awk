#
# predict-park.awk,  5 Oct 13

# Extract essential information from awk -f predict-park.awk < parkingcashless.csv > all_reports.csv

# amount paid, paid duration mins, start date, start day, end date, end day, start time, end time,
# DesignationType, Hours of Control, Tariff, Max Stay, Spaces, Street, x coordinate, y coordinate, latitude, longitude 

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
gsub(/"/, "", $0)

#print substr($3, 1, 10) "," $7 "," $8 "," $13 "," $17 "," $18
print substr($3, 1, 10) "," dofw[tolower($4)] "," $7 "," $8 "," $13 "," $14
}
