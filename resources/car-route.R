#
# car-route.R,  5 Oct 13

library("cccd")

carspace=read.csv("c:/web/unique-lat-long-with-headers.csv")
head(carspace)
g_e=rng(as.matrix(carspace))

plot(g_e)

write.graph(g_e, file="c:/Web/parking_euclid.txt" , format="edgelist")


g_m=rng(as.matrix(carspace), method="manhattan")

plot(g_m)

write.graph(g_m, file="c:/Web/parking_manhat.txt" , format="edgelist")
