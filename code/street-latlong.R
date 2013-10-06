#
# street-latlong.R,  6 Oct 13

library(plyr)

av_latlong=function(df)
{
lat=mean(df$lat)
long=mean(df$long)

return(data.frame(av_lat=lat, av_long=long))
}

sll=read.csv("c:/Web/street-latlong.csv", as.is=TRUE)

t=ddply(sll, .(street), av_latlong)

write.csv(t, file="c:/Web/street-av-ll.csv", row.names=FALSE)

library("cccd")

g_e=rng(as.matrix(t[ , 2:3]))

plot(g_e)

write.graph(g_e, file="c:/Web/street-con_euclid.txt" , format="edgelist")


g_m=rng(as.matrix(t[ , 2:3]), method="manhattan")

plot(g_m)

write.graph(g_m, file="c:/Web/street-con_manhat.txt" , format="edgelist")
