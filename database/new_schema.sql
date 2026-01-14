alter session set "_ORACLE_SCRIPT"=true;
drop user trabajo_final cascade;
create user trabajo_final identified by trabajo_final;
GRANT RESOURCE TO trabajo_final;
grant create session to trabajo_final;
grant unlimited tablespace to trabajo_final;