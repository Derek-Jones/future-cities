#
# calc-free-spaces.R,  5 Oct 13

library(plyr)


combine_day=function(df)
{
# How many parking slots are available in each quarter?
m_sp=mean(df$spaces)*num_quarters

# Add up number in use in each quarter
ta=NULL
for (i in 1:nrow(df))
   ta=c(ta, seq(df$start[i], df$end[i]))
t=table(ta)

tname=as.numeric(names(t))
m_sp[tname]=m_sp[tname]-t

#print(ta)
#print(t)
#print(m_sp)

return(data.frame(free_space=m_sp, quarter=quarter_hr))
}

# Convert time of day to time measured in 15 mins from 00:00
mk_time=function(hr_min)
{
start=as.numeric(as.POSIXct("00:00", format="%H:%M"))
t=(as.numeric(as.POSIXct(hr_min, format="%H:%M"))-start) %/% (60*15)
return(t)
}


# Data format
# date,dofw,start,end,spaces,street

#all_parking=read.csv("c:/Web/pred-park.csv", as.is=TRUE)
all_parking=read.csv("c:/Web/all_parking.csv", as.is=TRUE)
all_parking$date=as.Date(all_parking$date, format="%Y-%m-%d")
all_parking$start=mk_time(all_parking$start)
all_parking$end=mk_time(all_parking$end)

# From 08:00 to 20:00
quarter_hr=seq(1, 24*4-1)
num_quarters=rep(1, 24*4-1)

#merge_park=ddply(all_parking, .(date,dofw,street), function(X) print(c(nrow(X), ncol(X))))
merge_park=ddply(all_parking, .(date,dofw,street), combine_day)

