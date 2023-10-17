import { timeStamp } from "console"
import { Schema, model, models } from "mongoose"





const deliverySchema = new Schema({
    code:{
    type: String,
    unique:true,
    required: [true,"code required"],
    },
    adresse:{
    type: String,
    required: [true,"adresse required"]
    },
    items:{
        type: Number,
        required: [true,"Number of items is required"]
    },
    delivered:{
        type: Boolean,
        default:false,
    },
    on_the_way:{
        type:Boolean,
        default:false,
    },
    priority:{
        type:String,
        default:"low"
    },
    expiry: {
        type: Date,
        default: () => {
          const currentDate = new Date();
          const expirationDate = new Date(currentDate);
          expirationDate.setDate(currentDate.getDate() + 15); // Add 15 days
          return expirationDate;
        }
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User", 
        required:[true,"give us the user"]
      },


},{ timestamps: true })

const delivery = models.delivery || model("delivery", deliverySchema)

export default delivery