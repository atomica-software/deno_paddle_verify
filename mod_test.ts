import { assertEquals } from 'https://deno.land/std@0.152.0/testing/asserts.ts';

import { validateSignature } from './mod.ts';

const paddle_signature =
  'ts=1692730519;h1=8061ab9ade34e61da50d5cd2947b64fe6b3cd79dc0676fbc9a03f4f4f8882aef';

const webhook_payload =
  '{"data":{"id":"sub_01h8f9kt6pym2yvjtcm6meg87w","items":[{"price":{"id":"pri_01h7e321vhvj8fjg5dd844sbfd","tax_mode":"account_setting","product_id":"pro_01h7e2yw6b8xm2gtq09wsvsgy6","unit_price":{"amount":"69841","currency_code":"CAD"},"description":"Annual billing","trial_period":null,"billing_cycle":{"interval":"year","frequency":1}},"status":"active","quantity":1,"recurring":true,"created_at":"2023-08-22T18:55:17.718Z","updated_at":"2023-08-22T18:55:17.718Z","trial_dates":null,"next_billed_at":"2024-08-22T18:55:15.412341Z","previously_billed_at":"2023-08-22T18:55:15.412341Z"}],"status":"active","paused_at":null,"address_id":"add_01h8f9k1nbbw5c6jj55bwdb4he","created_at":"2023-08-22T18:55:17.718Z","started_at":"2023-08-22T18:55:15.412341Z","updated_at":"2023-08-22T18:55:17.718Z","business_id":null,"canceled_at":null,"custom_data":{"teamId":"b859589c-428d-4889-be27-2d2fd373084c"},"customer_id":"ctm_01h84v23zmwr31xrza37s6mtwe","billing_cycle":{"interval":"year","frequency":1},"currency_code":"CAD","next_billed_at":"2024-08-22T18:55:15.412341Z","billing_details":null,"collection_mode":"automatic","first_billed_at":"2023-08-22T18:55:15.412341Z","scheduled_change":null,"current_billing_period":{"ends_at":"2024-08-22T18:55:15.412341Z","starts_at":"2023-08-22T18:55:15.412341Z"}},"event_id":"evt_01h8f9kvwn9vnmhrev93sxtdrw","event_type":"subscription.activated","occurred_at":"2023-08-22T18:55:19.445267Z","notification_id":"ntf_01h8f9kvygb90m30jjr3dqg3pm"}';

const secretKey =
  'pdl_ntfset_01h8f7cd25d9tyvfz4068g2c1j_3Mmf+3phZmxURAFWsBwrQeFcbSMbmLRF';

Deno.test('test valid webhook', async (): Promise<void> => {
  const isValid = await validateSignature(
    paddle_signature,
    webhook_payload,
    secretKey
  );
  assertEquals(isValid, true);
});

Deno.test('test invalid webhook', async (): Promise<void> => {
  const isValid = await validateSignature(
    paddle_signature,
    webhook_payload,
    'not my secret'
  );
  assertEquals(isValid, false);
});
