use cravelio;

select * from users;
select * from trips;
select * from pictures;
select * from reviews;
select * from reviews_picture;
select * from transactions;
select * from trips, pictures where trips.trip_id = pictures.trip_id and is_main = 1;
select * from trips, pictures where trips.trip_id = pictures.trip_id;
select * from pictures where trips.trip_id = pictures.trip_id;
select * from trips, pictures where pictures.trip_id = 1;
select * from pictures where trip_id = 1 and is_main = 1;
select * from trips join pictures on trips.trip_id = pictures.trip_id;
select * from trips where trip_id = 1;
select * from users, reviews where users.user_id = reviews.user_id and trip_id = 1;

select * from trips t
join pictures p on t.trip_id = p.trip_id
where t.trip_id = 1;

select * from pictures where trip_id = 1 and not is_main = 1;

select * from reviews where trip_id = 1;

select reviews.review_id, review_title, review_content, star, first_name, last_name, picture_link from reviews
join users on reviews.user_id = users.user_id
join reviews_picture on reviews.review_id = reviews_picture.review_id
where trip_id = 1;

select picture_link from reviews_picture
where review_id = 2;

select * from reviews;
select * from reviews_picture;

select * from reviews
left join reviews_picture on reviews.review_id = reviews_picture.review_id;

select * from reviews
join users on reviews.user_id = users.user_id
left join reviews_picture on reviews.review_id = reviews_picture.review_id;