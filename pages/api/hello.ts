// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nc from 'next-connect'
import { cors } from "@middleware";
import { ApiRequest, ApiResponse } from '@/types';
import { assert, catchAPIErrors, onError, testPromise} from '@helpers/api';

type Data = {
  hello: string
}

export const config = {
  api: {
    externalResolver: true,
  },
}

const handler = nc<ApiRequest, ApiResponse>({ onError, attachParams: true });

handler
  .use(cors)
  .get(
    async (req, res) => {
      
      const hello = assert(req.query, "hello" )
      res.status(201).json({ hello })
  })
  .post(
      async (req, res) => {
      const data = assert(req.body, "data" )
      const newData = await catchAPIErrors(testPromise(data))
      res.status(201).json({ newData })
  })


export default handler;