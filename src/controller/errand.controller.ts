import { Request, Response } from "express";
import { users } from "../database/user";
import { Errand } from "../models/errands";

//afazeres

export class ErrandController {
  public createErrand(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, detail } = req.body;
  
      const user = users.find((user) => user.id === userId);
  
      if (!user) {
        return res
          .status(404)
          .send({ ok: false, message: "User was not found" });
      }
  
      
      const newErrand = new Errand(title, detail);
      user.errands?.push(newErrand);
  
      const responsePayload = {
        ok: true,
        message: "Errand successfully added.",
        data: newErrand.toJson(),
      };
  
      return res.status(200).send(responsePayload);
    
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  

    public listErrand(req: Request, res: Response) {
      try {
        const { userId } = req.params;
  
        const user = users.find((user) => user.id === userId);
  
        if (!user) {
          return res
            .status(404)
            .send({ ok: false, message: "User was not found" });
        }
  
        const errands = user.errands.map((errands) =>
        errands.toJson()
      );
  
        return res.status(200).send({
          ok: true,
          message: "Errand was sucessfully listed",
          data: errands
        });
      } catch (error: any) {
        return res.status(500).send({
          ok: false,
          message: error.toString(),
        });
      }
    }

    public updateErrand(req: Request, res: Response) {
      try {
        const { userId, errandId } = req.params;
        const { title, detail } = req.body;
  
        const user = users.find((user) => user.id === userId);
  
        if (!user) {
          return res
            .status(404)
            .send({ ok: false, message: "User was not found" });
        }
  
        const ErrandIndex = user.errands.find(
          (errand) => errand.idErrand === errandId
        );
  
        if (!ErrandIndex) {
          return res
            .status(404)
            .send({ ok: false, message: "Errand was not found." });
        }
  
        if ( !title || !detail ) {
          return res
            .status(400)
            .send({ ok: false, message: "Errand is invalid" });
        }
  
        ErrandIndex.title = title;
        ErrandIndex.detail = detail;
  
        return res
          .status(200)
          .send({ ok: true, message: "Errand was successfully updated" });
      } catch (error: any) {
        return res.status(500).send({
          ok: false,
          message: error.toString(),
        });
      }
    }

    public deleteErrand(req: Request, res: Response) {
      try {
        const { userId, errandId } = req.params;
  
        const user = users.find((user) => user.id === userId);
  
        if (!user) {
          return res
            .status(404)
            .send({ ok: false, message: "User was not found." });
        }
  
        const ErrandIndex = user.errands.findIndex(
          (errand) => errand.idErrand === errandId
        );
          
        if (ErrandIndex === -1) {
          return res
            .status(404)
            .send({ ok: false, message: "Errand was not found." });
        }
        
        
        const deletedErrand = user.errands.splice(ErrandIndex, 1);
  
        return res.status(200).send({
          ok: true,
          message: "Errand was deleted",
          data: deletedErrand[0].toJson(),
          });  
       
      } catch (error: any) {
        return res.status(500).send({
          ok: false,
          message: error.toString(),
        });
      }
    }

    public archiveErrand(req: Request, res: Response) {
      try {
        const { userId, errandId } = req.params;
    
        const user = users.find((user) => user.id === userId);
    
        if (!user) {
          return res
            .status(404)
            .send({ ok: false, message: "User was not found." });
        }
    
        const errand = user.errands.find((errand) => errand.idErrand === errandId);
    
        if (!errand) {
          return res
            .status(404)
            .send({ ok: false, message: "Errand was not found." });
        }
        
        if(errand._archived === false){
          errand._archived = true;
        }
        else{
          return res
            .status(400)
            .send({ ok: false, message: "Errand already archived." });
        }
    
        return res
          .status(200)
          .send({ ok: true, message: "Errand was successfully archived." });
      } catch (error: any) {
        return res.status(500).send({
          ok: false,
          message: error.toString(),
        });
      }
    }
    
    public unarchiveErrand(req: Request, res: Response) {
      try {
        const { userId, errandId } = req.params;
    
        const user = users.find((user) => user.id === userId);
    
        if (!user) {
          return res
            .status(404)
            .send({ ok: false, message: "User was not found." });
        }
    
        const errand = user.errands.find((errand) => errand.idErrand === errandId);
    
        if (!errand) {
          return res
            .status(404)
            .send({ ok: false, message: "Errand was not found." });
        }
    
        if(errand._archived === true){
          errand._archived = false;
        }
        else{
          return res
            .status(500)
            .send({ ok: false, message: "Errand already unarchived." });
        }
    
        return res
          .status(200)
          .send({ ok: true, message: "Errand was successfully unarchived." });
      } catch (error: any) {
        return res.status(500).send({
          ok: false,
          message: error.toString(),
        });
      }
    }
    
  public filterErrands(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { title, archived } = req.query;

    const user = users.find((user) => user.id === userId);

    if (!user) {
      return res
        .status(404)
        .send({ ok: false, message: 'User was not found.' });
    }

    let filteredErrands = user.errands;

    if (title) {
      const lowerCasetitle = String(title).toLowerCase();
      filteredErrands = filteredErrands.filter(
        (errand) => errand.title.toLowerCase().includes(lowerCasetitle)
      );
    }

    
    if (archived !== "") {
      const isArchived = archived === 'true';
      filteredErrands = filteredErrands.filter((errand) => errand._archived === isArchived);
    }

    return res.status(200).send({ ok: true, errands: filteredErrands });
  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: error.toString(),
    });
  }
}
};