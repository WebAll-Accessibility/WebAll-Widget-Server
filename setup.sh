touch db/weball.tmp
cat db/weball.sql >> db/weball.tmp
echo "\nexit\n" >> db/weball.tmp

mysql -u $1 -p < db/weball.tmp

rm db/weball.tmp
