interface ObjectSearch {
    keyword: string,
    regex?: RegExp
}
const searchHelper = (query: Record<string, any>) => { // Record tạo ra một record mới có key: string, giá trị là any, mặc định của query
    let objectSearch : ObjectSearch = {
        keyword: ""
    }
    if(query.keyword) {
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex
    }

    return objectSearch;
}
export default searchHelper;