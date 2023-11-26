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
//[GET]/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    })

    res.json(task);
}
//[PATCH]/change-status/:id
export const changeStatus = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const status: string = req.body.status;
        const task = await Task.updateOne({
            _id: id,
        }, {
            status: status
        })
        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công"
        })
    }
    catch(error) {
        res.json({
            code: 400,
            message: "Không tồn tại"
        })
    }

}
//[PATCH]/change-multi/
export const changeMulti = async (req: Request, res: Response) => {
    try {
        const ids: string[] = req.body.ids;
        const key: string = req.body.key;
        const value: string = req.body.value;

        switch (key) {
            case "status":
                await Task.updateMany({
                    _id: {$in: ids}
                }, {
                    status: value
                })
                break;
        
            default:
                break;
        }
        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công"
        })
    }
    catch(error) {
        res.json({
            code: 400,
            message: "Không tồn tại"
        })
    }

}
