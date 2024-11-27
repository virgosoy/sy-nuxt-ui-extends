/**
 * 补齐一些没有显式导出的类型
 * nuxt-ui v2.14.1
 */
type IfNever<T, Y, N = T> = [T] extends [never] ? Y : N;

/** 
 * 如果泛型需要默认可以传入 never
 * 参考官方类型，然后进行一些补充
 * @link https://ui.nuxt.com/components/table#props
 */
export type UTablePropColumns<
  RowsT extends Record<string, unknown>[] = never, 
  ColumnAttributeT extends string = never,
  D = {
    rows: IfNever<RowsT, Record<string, unknown>[]>
    columnAttribute: IfNever<ColumnAttributeT, 'label'>
  }> = ({ 
  // 修改官方的
  // [key: string]: any; 
  // key: string
  key: (keyof D['rows'][number]) | (string & {}); 
  // 原先官方的一部分
  sortable?: boolean; sort?: (a: any, b: any, direction: "asc" | "desc") => number; direction?: "asc" | "desc"; class?: string; 
  // 扩展的
} & {
    /**
   * 列头显示文本，实际此 key 取决于 {@link UTable.columnAttribute} 的值
   */
    [K in D['columnAttribute']]?: string
})[]
