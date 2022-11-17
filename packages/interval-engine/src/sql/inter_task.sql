create table inter.inter_task
(
    id          int auto_increment comment '主键id'
        primary key,
    title       varchar(40)  default ''                not null comment '任务标题',
    description varchar(255) default ''                not null comment '任务描述',
    url         varchar(255)                           not null comment '用户请求的url',
    inter_time  time                                   not null comment '请求的定时时间',
    method      int          default 0                 not null comment '请求体的方法 0 get 1 post 2 put 3 delete',
    params      varchar(255)                           not null comment '请求体参数 json',
    cookie      varchar(3000)                          not null comment 'cookie值',
    callback    varchar(255) default ''                not null comment '请求成功之后将数据传输的回调地址',
    create_time datetime     default CURRENT_TIMESTAMP not null comment '创建时间',
    update_time datetime     default CURRENT_TIMESTAMP not null comment '更新时间',
    is_delete    int          default 0                 not null comment '是否删除'
);
