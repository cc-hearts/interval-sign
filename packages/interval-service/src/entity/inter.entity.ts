import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('inter_task')
export class InterEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: '主键id',
  })
  id: number

  @Column({ type: 'varchar', length: 40, comment: '任务标题', default: '' })
  title: string

  @Column({ type: 'varchar', comment: '任务描述', default: '' })
  description: string

  @Column({ type: 'varchar', comment: '用户请求的url' })
  url: string

  @Column({ type: 'time', name: 'inter_time', comment: '请求的定时时间' })
  interTime: string

  @Column({
    type: 'int',
    default: 0,
    comment: '请求体的方法 0 get 1 post 2 put 3 delete',
  })
  method: number

  @Column({
    type: 'varchar',
    comment: '请求体参数 json',
  })
  params: string

  @Column({
    type: 'varchar',
    length: 3000,
    comment: 'cookie值',
  })
  cookie: string

  @Column({
    type: 'varchar',
    comment: '请求成功之后将数据传输的回调地址',
    default: '',
  })
  callback: string

  @Column({
    type: 'datetime',
    name: 'create_time',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date

  @Column({
    type: 'datetime',
    name: 'update_time',
    comment: '更新时间',
    // 可以使用() => 'xxx' 使用sql的表达式
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date

  @Column({ type: 'int', name: 'is_delete', comment: '是否删除', default: 0 })
  isDelete: number
}
