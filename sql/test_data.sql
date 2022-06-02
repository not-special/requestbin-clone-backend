-- Data insertion

INSERT INTO bins (path)
  VALUES ('test1'),
         ('test2');

INSERT INTO requests(bin_id, http_method, content_type_header, content_length_header,headers, payload)
  VALUES (1,'POST','application/json','2342', '{}', '{}'),
         (2,'GET','application/json','1274', '{}', '{}');
