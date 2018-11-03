import psycopg2
try:
   conn=psycopg2.connect("host='localhost' port='5432' dbname='kb' user='kbuser' password='j'")
except:
   print "open db error"

cur = conn.cursor()
try:
   cur.execute("""SELECT NOW()""")
except:
   print "query error"

rows = cur.fetchall()
for row in rows:
   print row[0]

v=({"name":'a',"path":'b'},{"name":'z',"path":'x'})
cur = conn.cursor()
cur.executemany("""INSERT INTO files(name, path) VALUES (%(name)s, %(path)s)""", v)
conn.commit()

conn.close()
