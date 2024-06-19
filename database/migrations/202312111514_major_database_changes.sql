drop table if exists regions_used, realtor_regions; 

ALTER TABLE realtor
ADD COLUMN regions VARCHAR(255);

drop table if exists contact_options, socials_options, socials_realtor; 

alter table realtor 
add column realtor_instagram VARCHAR(255);

alter table realtor 
add column realtor_facebook VARCHAR(255);

alter table realtor 
add column realtor_whatsapp VARCHAR(255);