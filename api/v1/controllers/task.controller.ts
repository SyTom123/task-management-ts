import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";
import Task from "../model/task.model"
import {Request, Response} from 'express';

export const index = async (req: Request, res: Response) => {
    // find
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp
    }
    const find: Find = {
        deleted: false
    };
    
    if(req.query.status) {
        find.status= req.query.status.toString();
    }

    // search
    let objectSearch = searchHelper(req.query);
    if(req.query.keyword) {
        find.title = objectSearch.regex;
    }

    // sort
    const sort = {

    }
    if(req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue;
    }

     // pagination

    let initPagination= {
        currentPage : 1,
        limitItems: 2
    }
    const countRecords = +(await Task.countDocuments(find));
    const objectPagination = paginationHelper(
        initPagination,
        req.query,
        countRecords
    )
    const tasks = await Task.find(find).sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

    res.json(tasks)
}
export const detail = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    })

    res.json(task);
}