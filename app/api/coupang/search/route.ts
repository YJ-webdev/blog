import { NextRequest } from 'next/server';
import crypto from 'crypto';
import moment from 'moment';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const keyword = searchParams.get('keyword') || '추천';

  const accessKey = process.env.COUPANG_ACCESS_KEY!;
  const secretKey = process.env.COUPANG_SECRET_KEY!;
  const method = 'POST';
  const path =
    '/v2/providers/affiliate_open_api/apis/openapi/v1/products/search';
  const query = '';

  const datetime = moment.utc().format('YYMMDD[T]HHmmss[Z]');
  const message = `${datetime}${method}${path}${query}`;

  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(message)
    .digest('hex');

  const authorization = `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${datetime}, signature=${signature}`;

  const res = await fetch(`https://api-gateway.coupang.com${path}`, {
    method: 'POST',
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      keyword,
      limit: 1,
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
