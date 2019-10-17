# API

## USER
#### GET /api/user/
###### mengambil semua data user. data picture tidak diambil, hanya idnya saja.

#### GET /api/user/:user_id 
###### mengambil data user berdasarkan id beserta picture yang dimiliki user

#### POST /api/user/ 
###### mengingput data ke database, format pada body {name : string, age : number, email : string, address : string}  

#### PUT /api/user/:user_id 
###### mengupdate data user di database, format pada body sama dengan POST  

#### DELETE /api/user/:user_id 
###### menghapus data user bedasarkan id  

  

## PICTURE
#### GET /api/picture/ 
###### mengambil semua data picture  

#### GET /api/picture/:pic_id 
###### mengambil data picture berdsarkan id  

#### GET /api/picture/user/:user_id 
###### mengambil semua data pictures yang dimiliki user berdasarkan user_id  

#### POST /api/picture/ 
###### menginput data picture ke database, format pada body {user_id : number, pic_name : string, pic_url : string}  

#### PUT /api/picture/:pic_id 
###### mengupdate data gambar berdasarkan pic_id dan mengubah data pictures pada user, format pada body sama seperti picture  

#### DELETE /api/picture/:pic_id 
###### menghapus data gambar berdasarkan pic_id dan mengahapus data pictures pada user  


## DATABASE
#### Data disimpan di mongodb atlas