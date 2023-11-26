
interface ObjecPagination {
    currentPage : number,
    limitItems: number,
    skip?: number,
    totalPage?: number
};

const paginationHelper = (objecPagination: ObjecPagination, query: Record<string, any>,
    countRecord: number):ObjecPagination  => {
    if(query.page) {
        objecPagination.currentPage = +query.page;
    }
    if(query.limit) {
        objecPagination.limitItems = +query.limit;
    }
    objecPagination.skip = (objecPagination.currentPage - 1) * objecPagination.limitItems;
    objecPagination.totalPage = Math.ceil( +countRecord / objecPagination.limitItems);
    return objecPagination;
}
export default paginationHelper;