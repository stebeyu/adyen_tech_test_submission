# Adyen Tech Test Details

## Payment Methods
### /paymentMethods

**Purpose**: Submit shopper location and transaction amount to display available payment methods. Requested every time checkout loads.

<details><summary>Request</summary>
<p>

```json
{
   "merchantAccount":"AdyenRecruitmentCOM",
   "countryCode":"AU",
   "amount":{
      
   },
   "channel":"Web",
   "shopperLocale":"en-AU"
}
```
</p>
</details>

<details><summary>Response</summary>
<p>

```json
{
   "paymentMethods":[
      {
         "brands":[
            "visa",
            "mc",
            "amex",
            "diners",
            "discover",
            "maestro"
         ],
         "details":[
            {
               "key":"encryptedCardNumber",
               "type":"cardToken"
            },
            {
               "key":"encryptedSecurityCode",
               "type":"cardToken"
            },
            {
               "key":"encryptedExpiryMonth",
               "type":"cardToken"
            },
            {
               "key":"encryptedExpiryYear",
               "type":"cardToken"
            },
            {
               "key":"holderName",
               "optional":true,
               "type":"text"
            }
         ],
         "name":"Credit Card",
         "type":"scheme"
      },
      {
         "name":"POLi",
         "type":"poli"
      },
      {
         "name":"AliPay",
         "type":"alipay"
      },
      {
         "configuration":{
            "merchantId":"1000",
            "gatewayMerchantId":"AdyenRecruitmentCOM"
         },
         "details":[
            {
               "key":"paywithgoogle.token",
               "type":"payWithGoogleToken"
            }
         ],
         "name":"Google Pay",
         "type":"paywithgoogle"
      },
      {
         "name":"WeChat Pay",
         "type":"wechatpayQR"
      },
      {
         "name":"WeChat Pay",
         "type":"wechatpayWeb"
      }
   ]
}
```
</p>
</details>


## Card with 3DS2 (Redirect)
**PSP Reference**: 882626917042228J
### /payments

**Purpose**: Submit initial payment request with shopper and transaction info

<details><summary>Request</summary>
<p>

```json
{
   "paymentMethod":{
      "type":"scheme",
      "holderName":"P Sherman",
      "encryptedCardNumber":"adyenjs_0_1_25$BZpUep9XIzhcRAcY1Nr5hLOhGdJ47MLOpv555px8VrcARzgOkco584f6E4GtB9JZDUfnJLmebsKyiLbujUiO6uzszsIK8MiX1QMhkMuRYiLw1mWKiBn/BmvNW+Uc1K9EwwGKDU8KoF+B44qWEZOZvs9sGia/rB45hOqmWZD5VQP2R55npIEItAyP/GXuuAf+yDJJqkx5McRLRXajaL3RiSOWoFKmP5N2UqTAj9H/7+ZGqAKa9u0dN8FiTlPtydMRZ1Hmp+LoNeIwsPOSkeNFlczsPuRO9smZHYOM1rwd8ICDNS3PzZTo3uX5dfn0vByMxJPOOsnDUD7F7tXeiVSiGg==$YXtYuXMf7/7IzEnRsTqiCT3mbrCXXpaiIT/OmCT5joz5+YAvFJ160NZLU5WYKxGQF7aSlrzVrptwJsDtxkGvIHdPKSfN4fqMtsFCUku48IVP78rc241/+JPY75k6YbX3SxB7E8RJlOf9N/h7r+7IRYe8eCADrtiGaD5wiL2fezvhV1lloTeuDY8haKvO5XC/Ks/dE4nGB/kPzR7O6ZKJlfAJP4R7avWWpi5QMlVs/3ScLbP1BT0PDQBf9qEXMqz39HYCaPZ3o6TdcbX26dktmtjSAmoxCjaz0i7xuJG9PORlmCa6c2DgR/4fk37qKnyxXxnWuUyuq7DAugvfBUtKcmOyFrFbifvo8ml8GwpAOZY+FHiJmozC4bVxRxcZuWcoOAvA+w7oTDIs/cScSjS8Hk+XOFZsFEs09iywle/vTbE1Oq570aoPU9BurzHpVt/oRnk8DVenMmGeUdIgdOdjLavJkZ3dM+L++NhnjOmygh2NSIU1OeIm1fINSLJ5EsiWIewetXtqzkctLrUxsjVGBdorosVT8LnNnabpxBPUBwne3v0MXXXe3VVi115ibno0eBuw/xJW+adf18lkmzNsBbWzg2BbPF29TznGK9LudiPpbkNam8YP81AWwxBC6tcu2VMBezyuZdD+uii0eW8JgcQrCva3Gb/R80xxZuVyXUfABuxLcHZ5PfqKo+JlYjpgJq1CZKvPJeY=",
      "encryptedExpiryMonth":"adyenjs_0_1_25$PrB1FHufxSR35bLZHd0s7pEnZFVWGUA6haSG81iJkKBuBwQSAH4igtuJ/WtEqbZTnlK4Do+/A7YidL9SCkHDqWJPo16u7pAEOeyM7tE6KzJNJIloxWDM8Cv8VYjnSRkWSR5Yy1+Aze2jJnA6gYb6ViWHh+vpvR5fUnXnKhIkDFjBITquFkCtnVhwlKmxJnPhvgOUquf73vAUF7azqQ6T6cwk93H5Z8tFPHk3sfuBRt9Qx6AdwoS12IqSmSfzrtHBVw0A+/8LURInEP08/okSnpQoPPyQZmqaeCLXVAEbMrZ58KiN8K7mLIjZ0XQdgS/7/GtHPbZ9jT+UaRA74DjamQ==$4YUh1SW3L6fSMtQRHhdGt7XMR7WsqCcf3ZY3sKDEMgLwebw2e5hMetu1gjEN43Cx2feKD65x95H1ViFP865buv27HWPSCadnPYYmndz8ad/ZPUsHI7zvpxf8Mn9bDSTsibtqM/SkoNGEwBKEv/45NhWl/oWnXA43ZuYEMsgDoSX85ASbmeql0kdSPLkPimMMXiHf3TUAnuoyJk4OdxsCOW8IA8HjU5Zig1zxfKiolKeWt1G2RUfWijx5y+0bq4Ug6cV4OR3dSgKaKLzlgZ/dCtpE1Q80kCfrskUtqvsL0RTEc3Kb1YOnWQircDEV2+BKpYhvoMzEU9F4UbdqXOVk7+4U0Z43J7M3SRCdXvFdTfygEKkcSlOlW5O2/IIRfbtRGsURuw==",
      "encryptedExpiryYear":"adyenjs_0_1_25$g7XoShvtAtkUNwMjipK38XFlHwu4HS4+MGlNtYQQlZpS+Il5lgDYZpdFX47qd8h5X9ALXDToCy4qUqKvZlMpLm63CL4L/ff/5oQ3zuffrMrzj8dNv0d3i2xw0dU35YspzuWm2bSx6+g7n7LYQ5UpbOHm2WxqBDwIk7mOMDY3zv/53LhlCBpqboGjSmrfbVnKq6mJv1yEh1WdbKehHEU1nKiRxSA0kuK2Z+PbD9cIdjXd507omjJ2Tdu/IK6TBlbBHz4E6LKWn7UxECx/RseMt1tWhZANPuEQjbWVXDxXtOm9QHwBvpRVT8ZXZqybgPtRBQwpkFnHHaVEbxic37j/EA==$yAhhcx6La6k6BSP3FpcbzKgiAGFrQJ/YsSUcDjE1/DARwTFHcFs4GXSQq38JqYMoge5WePJkT2WEkFtp2La064vg5Ep5nChAKBvuleLQQTCC9p2T1tCMDOzFjDkjQfiD3ZSklJLqwqi+NhB77D/MmWPCFpMiQiOhiC/sfKO/KhNqHaPeVdiOP3Ow2NwTgqLqnnUgXINQYHFVmShbOnCiK0aBkQF4r0aWQxOdmNGyCtyzDzbHJsx89q7WN9AY/fieCqsl0+1DHP4RA/HQbUoh2x8CnPMBp3+skTu/lErid0WDMLC1zCsHt62d5WF0PY+B0wLTJY50l7pvFwzJlAUSfXNiO5Df1YnylNC1h+8DL+vz30EPcXNXkP0iHeaZcVKPzxGGxss=",
      "encryptedSecurityCode":"adyenjs_0_1_25$Hgw9mkmJHniKmK01F3qhKxPs5dRrc/N/eAcR404OaYU+gTgqyt3pgj/PgPdmfQXE+NF/zLwm/VSf7cY7mx9Fb8XMRowF0ep8Z/8d44mIJvIUbCgLUWMqdcgkHmMvxiLp/2uEFHcA1/kzCorhAfaUq8+52jniaQEeTGeUHnIdj61dtGFTtfeqGbN46Hsgo/FvzJ4LZ2GR++xlpwQTaGjsmEemwrz6AjZFNs1jyf8hDufs071LAdfCwq5n8k8QNvygJr4wlP1dQIA4QUIlNSF/80SEdFtfUoHW6QHhj6jH6qCIraFZp+3nvAv1lEmi0/DaVA4csrxzMMNBllLRGYMa6g==$BP8slpbLNYxSiofTfwtftWQwAA0g/bhZgzA4tALpMVcgRw2KA8ThTlRBcAL982YwNA7KkLASrDe6oLrCQrkw2rR5gEj0+QeR/RH5jnYeRd8DRiYxMS6Gul4sr8/76bqv3mNNLxYKZyIIr4uqumuWXCNaIxK6nC+SjdAew5nsLJJfDEItLoTjK2107EBJHwU/UbkiT4fxWlR9lQVToTheqhEZw7Ut2rmzHLhlVN5nhuHIfiWVzv+e7pCNaW7pz16MgddKeIFx5airaahfKcQMld7O8JqfbH3z/DmsYNX8nLWicjO4MQr+yeL6oduOowYGIFiQ2y1A4GLoCT8mhT0vcekl3ksGibHc8ndbZ147syIg+c2Tqxk/hquyy9I2",
      "brand":"visa"
   },
   "browserInfo":{
      "acceptHeader":"*/*",
      "colorDepth":30,
      "language":"en-US",
      "javaEnabled":false,
      "screenHeight":900,
      "screenWidth":1440,
      "userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      "timeZoneOffset":240
   },
   "billingAddress":{
      "street":"42 Wallaby Way",
      "houseNumberOrName":"Apartment 2",
      "postalCode":"2000",
      "city":"Sydney",
      "stateOrProvince":"N/A",
      "country":"AU"
   },
   "merchantAccount":"AdyenRecruitmentCOM",
   "amount":{
      "currency":"EUR",
      "value":100
   },
   "reference":"Steve_checkoutChallenge",
   "origin":"http://localhost:8080",
   "returnUrl":"http://localhost:8080/api/handleShopperRedirect?orderRef=Steve_checkoutChallenge",
   "channel":"web"
}
```
</p>
</details>

<details><summary>Response</summary>
<p>

```json
{
   "resultCode":"RedirectShopper",
   "action":{
      "paymentMethodType":"scheme",
      "url":"https://checkoutshopper-test.adyen.com/checkoutshopper/threeDS2.shtml",
      "data":{
         "MD":"M2RzMi45MDc0OGIyOWU2YTcyZDI3M2JmMDNiYzZiMDY3MzQ1ZTA3YzkyNDQ1YjIxZjRiOGVhZjVhM2RiZWRlYTlmMTJmLjIuH4sIAAAAAAAAABXO0WrDIBgF4HfxeiTaxGEDYxTXi9GVQEpGC4Fh9V9N49QZE8hK33328pwDH-eGCKrQRi1gG5Bh6uMP2MjrPXpCpEyTjtFXXd7lxklhtBtjxTDDXS583-VaWGXgoJ33EBpQfQAZX11Qj_T9cogww5fUIAc3Ra6FMWAvkOxVov10zuZVxgiha8aKNWVlQUuabT4vS_k3DLRujrx9_mX22pqPt6CL95HXXPvT_nje7dRpxI-XOFk3JKcQwMoludu2Sf0szASoIhjf7__UpcNY5gAAAA",
         "PaReq":"BQABAgAHK8xEhVqV72W9bMGhK9WEg2VgHxBIsJtdjk_fgb-xgArF40rDXX4tYJX-1mXDGQJbRAtLYRiVyKIYHMMt9sZ1DlG-Z9jMFtMqXlttsUfuc7iAYMqJOqz1hcTopFOcmwAGzkAONVoCf0iQb-wf6aBUYIRnMOuyBVkj2CPmFxYMPTyd3q6olpwG-3JZpK8zVN3awqjh_mTwT1UjAIGcV75vIMC_1yN4ovDi57eoasmtHdx4BrKe05ERZZz8XbmMsBqltMPZwF10DgcEwk70UEA-lK2-A47FTX9gCQEpdcxvJEVcD4QFzAw-cQmyolk_VPXj8GcDpXIhL6Bg-0s75nZp09TdtzQVfX1t1j_rHnmGifHG4r47avY0QHUeTwZbbMngbaEtF6WQwLIpzTIo7evA3GJ10Zr5rb9zOrJcX22DYJ6jpAuLDiUeAhnkIpEAMgUhohiXkRRlqYtxkdBy8f_dnd2IYYcJiRbxTCpfRbPRYMlqGGok47srbD4ADY10YS12zcTiryMJ3dHPEVfsEhIivTHYK6YusgSdc12KkEMTfB9QdXGQ9k8FdTjCgSKoBRxm69c18EbZbp-3N_h-gDqW1Zdp3gVXlG5NQQBkNEi6W2Xqy-L7AObZN87-Z5bx-TOw5vTNtJNxH5tuMH_Lt2TBkEfRIzLmhS4gcwEUHDb4nRDHuj3a5ziqyVgWxF8NeoKgAEp7ImtleSI6IkFGMEFBQTEwM0NBNTM3RUFFRDg3QzI0REQ1MzkwOUI4MEE3OEE5MjNFMzgyM0Q2OERBQ0M5NEI5RkY4MzA1REMifYPWswjhv3Qz-eqLvxdUrX7mv1VWdK20S5NHzsV0a5fcwlgLKn2WjIWWKvzjwRsTb9r1cDg5I7J_E9mgIGBprZQrV_1pw8vLDQ6i3sARJ7l2pLnnP02_7M2szE3NvcpxO1IJ92rWZm8aMA65Yr7ZhVg30XYhqMEf5e-2SnS1c0gzwEErcAkvFaQPf_eTAB1bsZQW-6UvqjVz779x8Pc_rwecBYcKxFzA6sUQ5s_ELihPf89bO1IsASfhutpqqQ-0WQFPQI3zmBB78XADR493bE0Oc5jxVemPwGRk1baSt128di50BTRx7zzXsqAWGRU5u5TQzzA7JMkUNRYwfRqZP6khkFtZi6EYwLp52-xT8aLJcaiWTGUTx6bQmAnIIS7gx3MG35GNmsHGUxndLcHa4YgrYonUQGUuMi4FAAEBAJvZsD0lwbQ3ZzP3d3nD9-ftNPEHCL-cLkb5XG4V7GkvM6I_Bc7br12gmVlduW6_R6xCdCtD8nx256zXROvmhCA3vTBy2YfA3q5RiA9VFHbQ38FTml55PU5i9CfPBHDMSFA6ZoGobPo1H8-M9EhfHIAYZFrZFtQElE1KO-Syzq1cExI2EuxVhZhDNI0Id1kqP7kgkCv8DT6xBzAfeqYTP6-WlKenw73JEvnF9ET5bpEB51X2O_QZFZlnIjHFLkrLfIj-emVHQon-Q6z-DsgREPWZVODC8D7pMsqOBkdabXN0BiPDOcBtGkV2rfqiZ0ac_9NkVZRXYJnvusXf8E6HkvsQ0HbzZyGSIuXOohssY2KFPwAAgLYHUac6TzSadicz5UIo-6jRTg4w4xnDI-PWjv9BwJrmCkad9VFvTvIfFuUodTmrArXRwLiAmhExFE3bYKQpgN4B23otToND1W4L5QBNAkpgHBGngArfrJaTiQxsOcaBTJ3TLRqksdiq8sLxESGq7M7zweuoc714U1CW24X6kNxUJtvOZD3aw97t8JvnOn9dcwirOg2lPHAc7-A1SJBs5lOcUSypPXyFz5rlglyPrKiCVKB9VlGbdZGDkZP999AG4uRr12skQ93T5A2rab1x1aV01us9hzaBn_VpCCjUOOSpMjQ5ety8h98j7QVLqSp6qQP2S-XASne3XbMdohLw7BeLaWZ32yTptZ23oA46vyHIMjbKgpHlLOtBOU5NmDBLA5CpFH6Zeg5g3yTGXeoAvxbxPd2o9KsvGKa9c-jJyYcxcmzx986lhfto8OXc24IqoUu-76vkUNqMQi51Tgu_KJvKjBcNdPxAV9lMJw-zAxXVrvNI46KFDAZugGaayAu0BkV1oUKw3YnSt1Td15IJPoaK1ZYM4p-86Er9YW319Kt7DKW-mcXxXX9-4wbkTg_9qEzoQFzJFtfGzwcDdL0ebh7UP9Gv0_zgWnc9AcWpbB5wTok3M4IH_xptsKP5F8xsTj6Ic-Sb_-qLcgfDzCxyDvtKvDt79brDhqjwSavNRvWT0vIVGhg1DLHnpdk15TneM9BTJy_x64R0rsPXl4ZOAjU2LFZjBKgDhrU76WGJLI_Z42CMSs2PSzqPB_fVBE9zG5WgtL8j0p_BFpsgMATdx9emtU7c3bOc_iaKH4pWax9top5n2TojTBl4NSGI7vzJoVh-TTuzovdWImcOJqGMqDoPzGfZ3ChwPNycFU9y8zL1U9YPO28FNb3naqwNYzdHHka75-3KtNAZoG9X18O_s82FYmOHVqybJKcgXDn050jL3YnrefKlJS0fzVPN3Ng10BqRIKD_apHoCCVn9kRfIUXoLRVpxc-1pVfKSaHpdBemyaS4jRKTAnqLy9m6KmyqbxcbX7NWedfTYFGIgavN0-kFexzyXvs1fCOmUR3gelZhPoP8toB_qqgLEu_WF0ZHTK98gvTwwOV4ibLRglqg1tSf0RkL_nDuVe1KWe3L1J_v_c00D4InXyTOqtV6dXJBvpPRKEfAZQxrTRUz42Wne6Cbpiy0ePPiAST6lPtqYsSUSqn2U7P-JOygG6OASan0IHCyXBqQ5XFa5J5P8aQi-biT5lH3hHkIB_YtkrvuX88NiGDCFyJvYFWPVgkpKaCmnsfbcrvF97CM18UQZy__1TXCtMlvYmJuEhsF2ERuowEJW561OfEoyZ4V553QDwIfc4zU3z4lVaqZNdjAyqRdjrRnSLzdnp2TAZJJyKahLndzN1dRtaJMSBURhAq6chBIbfi1N_Lhnq-sx5GZQVjodkfPk-OI4BPQoFgc4ZMI66GUSbt8zjIAv-V07L6MaZG-zy4lntUotfn-eAvrp3943YrnTk9vgmbm7uqBx8TEwJ45dzWZ9XqpUQb-SJN7VdN2FwomPvnTKT7N_RHwGhUstNK5W3l-9DMWHSU2Sys9yAYX-nAVY1oSTduMMz_QKn2alno3P1BaVvP9Bln4Tyv1ekq9EGReA8O2eRhTLDwtpcaFFx_Pe2JIvb3Yniq5iXXvXA0gIIxDLqkG0DVRTH-F7LN0fhfUPqpfw6UiztMnpIWrAFq5n_mDAT3KZjeHkApbD_dJuCH7w7ECWoM8fT_3ARTn397Ru541xfHYpHt1S4c01aZnCNRjqS3eZ2BZYxRlaEgJcIxGpQ5kMoUcdc8pA6RjsaBB2GqCjQJrrTVKNDL9QMNV-zWYYUTBYhGL2xeLD3VOIbJ1bHAjK4vLkm0zrsN0scrTCU5ATydPmOdlYTI4F9PrJ_Vb4UD583kfpP9rI-KDAWibw9ickdpN7sszV6TvWqRmysn6FuI6IXKi2S5OrOr14_MW1xEmmm_tckr8vYJrkAfH",
         "TermUrl":"https://checkoutshopper-test.adyen.com/checkoutshopper/threeDS/return/aW50ZWdyYXRpb249YXBpX2F1dGgmcHNwUmVmZXJlbmNlPTg4MjYyNjkxNzA0MjIyOEomc2lnPXcxTm9kM0ZIVy1OYTE4eGcwUTFINDVGb04tWGo5VTRnX28wRm9ZVTBGTkE"
      },
      "method":"POST",
      "type":"redirect"
   }
}
```
</p>
</details>



### /payments/additionalDetails

**Purpose**: submit additional details following Drop-in 3DS2 authentication  and redirect handling

<details><summary>Request</summary>
<p>

```json
{
   "details":{
      "redirectResult":"Ab02b4c0!BQABAgAUheY5jhpL7TNGS4DTeNsJs8aRV+ddh0/xw0c6qPCI59qvghH98yjuf3G6O0aTvEbIV3NgDy9duatDFX3WE40cY61wHjwceEIwvzD+GKFUHKfL6srULGI7zPs6YW5qEpszabipuidceMwkuVCYFTH8SyMx5yi/vFjvv7WA3KGcqf+bu0DV0GAjvw9H8FsU6RYzw+aAlG14KdOvD3IV5ikBIxwZw6QDqjRylayEwHtd5Swfey3B3dB1G/nhyA6+W+IrKTI9SQzU72s24CYIQQgbyYHc7v59SiVNtHkvptHSwsT83py4aQJI2SIo4dMDRC50Tbgwe2AcJVCzhkP+2vEBpgAyddaDgfL83Jz89vngThhZ8w9lQuiaDaujLSUJsgv9/q9sx9XpxwvaKB1PUWS/T/Xt+V4vnGY60RyjtqutIg+qM5uSNiQNm63J+sIsdQ5kTm6Qijel5aRVvTDBQudb9PqfwCvyLkIt0Bdvw4HQfXw03gEl/HhrWOvJnuw1KBUrtA55KryGEI9TE5AxucCH6WZIOB+Bi4BE0IzuDB0IlBYqlm9NoMY+lE8FFo9H1C5pystJ7TsrwHwKi01m4TF/7eRB6tqqq2t4w8xHn8K+3CoyOAvJxZJFFB5KaMGhHxe5JQwLrmyR54dqOkruLKM5nkxn/6QRG5105RhPn5H/DRAkzeQ4w9ERnzsB1GBj6UEkAEp7ImtleSI6IkFGMEFBQTEwM0NBNTM3RUFFRDg3QzI0REQ1MzkwOUI4MEE3OEE5MjNFMzgyM0Q2OERBQ0M5NEI5RkY4MzA1REMifaO3cKm5mo6FWtPgClNXfKvdMc6KdVQdhmkayKYbLbkyQ7OYx8qbn0TZfTXwZttv+moOz5xvU1TVRObnuKRRKqdg1fZAQzp+xS4eZZ+ft4FBu/ndyboQTrmeL4JK34fXKRI9Vyz/xmvs6XRzlfyAk1O362tGAVsDHxGQSCAvkXNA7iB8pHYO56i8n20oOXDTwjF9dM1BMH4v5g7G5oMG6DKarRr2LAdc7EBhBRs+A6iFrOxvcUYQz2vr/13Vi3uQlQbVvQaKtcxfpW9VfUa2Fx2wfVjOxCtzrCZC6v20sG/YY/W9Vj6WkbhIVPC+zhcSdmr1leu2LIAVeBbaXCI6/HZ292/volwH5vyCTx04AtOUANDLGqQYL86g7qx9vuVy+gyN6sf2KsosTCYZ4srctMYkWZQHlKrcoN8OWhChbK5su3zrbgi6Gb5ifIpKLCV7fThu79Ec+guYtnOyDo9KXRUdQN6r2LyQ3i0JzjjKSL0CfiVuY2wt4w66S+cB6x6ZKP7aBFPAliU4QFgPAyp6xtwSsnloNi/l8tcbfWTuYyuhhEbAIOh7EsvXGKoMt8ZTnaU+Cai1143Av01dWfBHp9cTTxCXVID3JL5RWoyLzFYPjBIFq/xSb5GUNGS6fVyyE5hGOjapJFiAkXkfcJKOwUOEVpQ5iVRhhEe0BWq/2L/19VTQZDaJC34T6ZTT7I385fJGmsfkhlI448PsI+JsEdPcVPE0BRd12uxVSqZLoCq3Vaz7VhfZanTzBn27YTRic30asiAywOT1EK90PQoyHLPKjM9DhwIF4Yd05u7s2YGl6H1ys2D3KQokW3+0K3KLGq6AHWQBSLr58Z3XyO/9mGxLnLNdLUMaJnAOACFxty6UgySstI53ILLn+qhmenWtcDs+VWZflB8pmIwAEkP+kBLLf/fPeFFnRl7JHPQ1143GOHFslWMKOI8afWZ4l8uvE+27TEXYM7wE4ClwHAavFT6JCmQkYMvnNQjg3j3B1sGTm+IugXlXSlTwUgGn2SS0zFcXtBJxqVz7Z11CZ52Rf72VF60jxcDGxWQtMvRoXw/nZLUffW+9w2Rpy16M0T5azQub7ePSSwWhMcgJnOK083vIrG48yu3ktMpbkkbL3Cl7IkeJhWp+XRRn3bMuc49gjsFLUIUg0bPy5TzZ"
   }
}
```
</p>
</details>

<details><summary>Response</summary>
<p>

```json
{
   "additionalData":{
      "avsResult":"4 AVS not supported for this card type",
      "cardSummary":"0000",
      "retry.attempt1.avsResultRaw":"4",
      "networkTxReference":"168946245039456",
      "refusalReasonRaw":"AUTHORISED",
      "eci":"05",
      "threeDSVersion":"2.1.0",
      "acquirerAccountCode":"TestPmmAcquirerAccount",
      "expiryDate":"3/2030",
      "cardBin":"491761",
      "threeDAuthenticated":"true",
      "cvcResultRaw":"M",
      "paymentMethodVariant":"visacredit",
      "merchantReference":"Steve_checkoutChallenge",
      "acquirerReference":"7CBJ96S7F59",
      "cardIssuingCountry":"PL",
      "liabilityShift":"true",
      "authCode":"048935",
      "fraudResultType":"GREEN",
      "cardHolderName":"P Sherman",
      "isCardCommercial":"unknown",
      "retry.attempt1.acquirerAccount":"TestPmmAcquirerAccount",
      "fraudManualReview":"false",
      "threeDOffered":"true",
      "retry.attempt1.acquirer":"TestPmmAcquirer",
      "threeDOfferedResponse":"C",
      "authorisationMid":"1000",
      "authorisedAmountValue":"100",
      "issuerCountry":"PL",
      "cvcResult":"1 Matches",
      "cavv":"QURZRU4gM0RTMiBURVNUIENBVlY=",
      "retry.attempt1.responseCode":"Approved",
      "authorisedAmountCurrency":"EUR",
      "threeDAuthenticatedResponse":"Y",
      "dsTransID":"0f965567-e2ed-4682-84a0-68038de649d0",
      "avsResultRaw":"4",
      "retry.attempt1.rawResponse":"AUTHORISED",
      "retry.attempt1.shopperInteraction":"Ecommerce",
      "paymentMethod":"visa",
      "cardPaymentMethod":"visacredit",
      "fundingSource":"CREDIT",
      "acquirerCode":"TestPmmAcquirer"
   },
   "fraudResult":{
      "accountScore":75,
      "results":[
         {
            "FraudCheckResult":{
               "accountScore":75,
               "checkId":-1,
               "name":"Pre-Auth-Risk-Total"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":25,
               "name":"CVCAuthResultCheck"
            }
         }
      ]
   },
   "pspReference":"882626917042228J",
   "resultCode":"Authorised",
   "merchantReference":"Steve_checkoutChallenge"
}
```
</p>
</details>



## Card Payment: 3DS2 + Native (Challenge)
PSP Reference: 862626917493131A
### 
### /payments

**Purpose**: submit initial payment request with shopper and transaction info

<details><summary>Request</summary>
<p>

```json
{
   "paymentMethod":{
      "type":"scheme",
      "holderName":"P Sherman",
      "encryptedCardNumber":"adyenjs_0_1_25$s6q96kbNTLNvzbnVVqd2PntuTb3qOGf7mXZdytvP78Rk84C+3/V5uKkoMr2W560fh3/+UX1ko3UrZZ2SkIZkXpohyb7TtOqOP2I6dr1rBZvn0oAsH1GJTule7/smFUor5M2Wd/2/4XkuQnN6CdQ6VFDa4t7qqtQ+5ava6dlRLpNOcHeZO4b3H3pCBzMejnlX2AZGVT77glM1fl7QNU2ssTbXJua+8CMcm9g7NJMbWSTtvdAXBAduiMNF/y0rJXWijhnCx++dyOolWz9B6Q/F7fcoBI4zz1GbJq1iUsr5OukBjmpgPY/WUFqQy6fvC1zaGm+DfWqsBDgBilATH8rkgg==$/WThxz87ljR6j1zQhdsiph8P2ZTqiJ8hL8naPdpo2gMiPiVU/I+JJaEXEoHY8OgX6dcjbnwPDISbC6N3TsxFdIvUNbK5aP9zdu64d9FFBDtboq5PVX8Qf14xgfVyu2Yfowk61Ms5iA78buhlBYi7AocgYOCz6IK639fE2qHnfrwRSKox+QQMN44TXWfa43PedMOjfqTOHoRJ+AB3hzyy0cXAA7ncPAYkzdZ4BTDN5ptWigH5RkVnEkpBIvEMRXplNao7uwBJnZNgW0YFsumyDmk54eAvzqjyWa67kjuacB/zRUlgElUutWduDWZDy0B8SEoN53PONFqTtVTgaopyJokU+oyEzw/Cm3USNeSH5O/5D+GTyrNFbiAxkjR0zsCX/WiHSig/MJQKvLLe8jDd2+NTle019S8CgHxNe3bnKZ44AZfnzrBouQtN17+WjbvRe1mxqAat8ZliEgS055pYgOr9FkzHcs7ltBOFeh6mUD/I2bhgr+X+z4bg9FFOYs/KWC8foiLTPKtGd/h2Ie2uFSoyrPAutei+p3dMi8bBhnvrsomU9uvVzW6qbqrPexEk53PXCRHynm/FhL0QzIo42XcOOwe2Gi0CEzYs1xU14eA61Qv6rD4rsp2w9NPasOzpY5S8WSYISkr2nm9C35msMOZlpn+4T/1fPgoRHDC2NR3K8MdZLCfC/X4i7uXnISubw9pSOezkYkjSlQ==",
      "encryptedExpiryMonth":"adyenjs_0_1_25$sBROW8tPgkGsUptgwTqnXKBUmwnCNJYfCCnor2/tEfE+i0RiTsNMnHho2Ap6mTJ0AyFKpPoonpp8hn1rjFUZxf6iuKHM6bNccPvF+OzAheIKmBxDxzEvhXl17Ft48Y1U2dPl7lGXeVmFc+2wM+tL7fMttZEgf7zh/3pVWANhnjBuicSwoq0pm9851NnwTFnsVruKjS/wfrNdHlmziiANRIFOJoM29Tg9zZJTHMC8ze8DysAXcQly/7n1/hJ7h7Ps5yqSQFTzAEQQNwZa/u1jJF+LHaGWJC1Gaso/Yg7m1UxvClnohOS9ct/qGhXq10aYEzjZXYimf0yIpiq/MmJKeg==$qn1px2kO5ZLsWF+AoBlZFYHRV10uG2ox0cy7ZfoHtYA9cjHZPuj+nEYnwBedp+oh3cYuEPO5hAqSlv74dhaH12IWA0ulf56m+x2IavgrP2BGSAQ5818KgOCFXITx9Kw5tKb3UpRH3NwQN2YK8fTc916QMZVsFUDXKuciY76epwkB6iKqVo1QS6uJVzDBZoc2Psrz8Kmms9i5Zlvf/MWgRirmUdbot4hg4t9MXJiXTdjRPVQYqwYXyxUcLsDG8tIKomIhPcXa8ZeuXKSzz5DC1y7F02Wwtj5dOzlTEeiMTFfd72BL/K/4W8e6aIFM1yMRVivOV7nrGwRXx5apj+aLDxyzyXJPXest2n8SfI+qdFk//1jgIcm8rWIpNrwCDKv57TdNIw==",
      "encryptedExpiryYear":"adyenjs_0_1_25$KS3lAlQjfoVS3AAy+wsvAlSLSyK5HsmgYXHwX2Yshg9w9RWRQu2XdfZTVHgyXcXBSqtY5anQnI1rUuunzu3Rz/xRQmssjezZ/U9OEsjuaeXSACLOKjtNgprLpEu3p+fBQPxD4FZTH2jTEjQU6IqrSXqUabml/A5gZe1A0cqtKodBoSVPy17dsRiDFoVCpV/FAi83xf3y7pEf77ikXsiM5LL5zKaTZf7ehZ65IEpAybHXFbaBke8eJU8ayOniMLMcf7R24qK3/xAMPvimMqvBedRPMtFOlCHVEvuW63YxuASyhBp3+rNzqoUMnNHykhIda/tk7WTiMw5ZT6rLaPDLKw==$XIK8VsoIk/eY5hvykht435Uuj37cUekKXpTidtZVmZthsFna9XFn/gVCjLo1oNu3h58naex64jrJQGWe/Djy3tbnD5m82KIYaZfGmcjErIKcME3brPYlFTo4q+K6ow5jgCk+z75ZaNUGABzOo/r0UnYdk3sa5D+SOW70x3hgOnYF/ZW2qOaPCXxvL8YZHg05K5QX0PWCwUl9lVH+o90aNfJYVId86UM58YOmcT1snYJM42tVsxZVNVfmeMlO9u8MQywZ5NHaF2Bp/6tHIcQCDWXSbwiBvhCqSqc83GgmqHK63QaziUexRp50qTlIX4Q5DP5OvOxm6/AEuaHa7yf3F+NaiP4Q4QNOU0w2YEcpcEASuPpm6ijIZwJtvauRZrSRzsvurcY=",
      "encryptedSecurityCode":"adyenjs_0_1_25$DiXPhpxGEEaO3dbBL+erAdiQ8+/mu5r9DQ8NAnxyB9WWfoZb3AWsCyUdp5ObveHLV4nXxo++HT2Uxv+vQ2bWs6NI2awDna5AFH6rZ0uGq2RHqS/MHnPYLSwu721V6opNl6/41JVZO+W0nqII/5Nfi0xPy8z9NCitGy7O6I+suGla0bSCRJNe4YaaMTvlJH+KhhxNRKGfSF6ItZh8zrkZLxzeXN/cQWZUuUJuwvBayH9nSm51H7W06e+CG5Quqgp8rxukzKQra8gpIxQRCIZr5dcQFvFJpf72bGTPXkfmWAp/1cMwReWqsedc7EjAwD9Wd+aShxHOWTLOsQ2R834h2g==$38wrpX164/5FS4ARdlB2vFAfiRdUcOWOgl3EgZNsg2lYKBz4IHQWrugjPdYD4vYsJk70WfKQqHaeyM1Dv27nYyiBwLDS5z8U2ou8Gzacryay+SqySbbmo9Xp941FAwmHkH/8obcrl+PKbvLeLXLMsDqvVbuMSZn/tWCVZlrMKdCgfU8+XFkuDnMSzyGqJdRMBPBI6EJ8a069E87RVrxP/YeGDSpJtOIjLHmg2A+xhn6WTbwLBIytEfPajrdHzmEaeix8Q8MCBogB4w4E1n/epXp9SUqDC5Oftr+z202WOqTfFjus6TExpCgTiVmWP7sW2xhPY6QhOU2k6n+DZY2D3bHQ+B8BvPP4qfIvd/Mma/9OUxONIDcM2W+/WHRK",
      "brand":"maestro"
   },
   "browserInfo":{
      "acceptHeader":"*/*",
      "colorDepth":30,
      "language":"en-US",
      "javaEnabled":false,
      "screenHeight":900,
      "screenWidth":1440,
      "userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      "timeZoneOffset":240
   },
   "billingAddress":{
      "street":"42 Wallaby Way",
      "houseNumberOrName":"Apartment 2",
      "postalCode":"2000",
      "city":"Sydney",
      "stateOrProvince":"N/A",
      "country":"AU"
   },
   "merchantAccount":"AdyenRecruitmentCOM",
   "amount":{
      "currency":"EUR",
      "value":100
   },
   "reference":"Steve_checkoutChallenge",
   "origin":"http://localhost:8080",
   "returnUrl":"http://localhost:8080/api/handleShopperRedirect?orderRef=Steve_checkoutChallenge",
   "additionalData":{
      "allow3DS2":true
   },
   "channel":"web"
}
```
</p>
</details>


<details><summary>Response</summary>
<p>

```json
{
   "resultCode":"IdentifyShopper",
   "action":{
      "paymentData":"Ab02b4c0!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",
      "paymentMethodType":"scheme",
      "authorisationToken":"Ab02b4c0!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",
      "subtype":"fingerprint",
      "token":"eyJ0aHJlZURTTWVzc2FnZVZlcnNpb24iOiIyLjEuMCIsInRocmVlRFNNZXRob2ROb3RpZmljYXRpb25VUkwiOiJodHRwczpcL1wvY2hlY2tvdXRzaG9wcGVyLXRlc3QuYWR5ZW4uY29tXC9jaGVja291dHNob3BwZXJcL3RocmVlRFNNZXRob2ROb3RpZmljYXRpb24uc2h0bWw/b3JpZ2luS2V5PXB1Yi52Mi44MTE1OTg4Mzk1ODQzNTQ1LmFIUjBjRG92TDJ4dlkyRnNhRzl6ZERvNE1EZ3cuSmd1THNpTWgybUp0UWpnUF9pRlFtZ0lIcy1tSWFua0lGWlM0cm9aQmYxTSIsInRocmVlRFNNZXRob2RVcmwiOiJodHRwczpcL1wvcGFsLXRlc3QuYWR5ZW4uY29tXC90aHJlZWRzMnNpbXVsYXRvclwvYWNzXC9zdGFydE1ldGhvZC5zaHRtbCIsInRocmVlRFNTZXJ2ZXJUcmFuc0lEIjoiNzAxY2U4NWMtMjcwZi00OTU0LTljYTYtZjZhYTc5OTVjMTVkIn0=",
      "type":"threeDS2"
   }
}
```
</p>
</details>

### /payments/additionalDetails

**Purpose**: submit additional details following Drop-in 3DS2 authentication

<details><summary>Request 1 (identifyShopper)</summary>
<p>

```json
{
   "details":{
      "threeds2.fingerprint":"eyJ0aHJlZURTQ29tcEluZCI6IlkifQ=="
   },
   "paymentData":"Ab02b4c0!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"
}
```
</p>
</details>

<details><summary>Response 1</summary>
<p>

```json
{
   "resultCode":"ChallengeShopper",
   "action":{
      "paymentData":"Ab02b4c0!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",
      "paymentMethodType":"scheme",
      "authorisationToken":"Ab02b4c0!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",
      "subtype":"challenge",
      "token":"eyJhY3NSZWZlcmVuY2VOdW1iZXIiOiJBRFlFTi1BQ1MtU0lNVUxBVE9SIiwiYWNzVHJhbnNJRCI6ImUzNjY4YjIxLWFmMGItNDZkMi04YmYxLWFhYzRkYjc1ZTEyZCIsImFjc1VSTCI6Imh0dHBzOlwvXC9wYWwtdGVzdC5hZHllbi5jb21cL3RocmVlZHMyc2ltdWxhdG9yXC9hY3NcL2NoYWxsZW5nZS5zaHRtbCIsIm1lc3NhZ2VWZXJzaW9uIjoiMi4xLjAiLCJ0aHJlZURTTm90aWZpY2F0aW9uVVJMIjoiaHR0cHM6XC9cL2NoZWNrb3V0c2hvcHBlci10ZXN0LmFkeWVuLmNvbVwvY2hlY2tvdXRzaG9wcGVyXC8zZG5vdGlmLnNodG1sP29yaWdpbktleT1wdWIudjIuODExNTk4ODM5NTg0MzU0NS5hSFIwY0RvdkwyeHZZMkZzYUc5emREbzRNRGd3LkpndUxzaU1oMm1KdFFqZ1BfaUZRbWdJSHMtbUlhbmtJRlpTNHJvWkJmMU0iLCJ0aHJlZURTU2VydmVyVHJhbnNJRCI6IjcwMWNlODVjLTI3MGYtNDk1NC05Y2E2LWY2YWE3OTk1YzE1ZCJ9",
      "type":"threeDS2"
   }
}
```
</p>
</details>

<details><summary>Request 2 (challengeShopper)</summary>
<p>

```json
{
   "details":{
      "threeds2.challengeResult":"eyJ0cmFuc1N0YXR1cyI6IlkifQ=="
   },
   "paymentData":"Ab02b4c0!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"
}
```
</p>
</details>

<details><summary>Response 2</summary>
<p>

```json
{
   "additionalData":{
      "refusalReasonRaw":"AUTHORISED",
      "eci":"02",
      "threeDSVersion":"2.1.0",
      "acquirerAccountCode":"TestPmmAcquirerAccount",
      "threeDAuthenticated":"true",
      "paymentMethodVariant":"maestro",
      "fraudManualReview":"false",
      "threeDOffered":"true",
      "threeDOfferedResponse":"C",
      "authorisationMid":"1000",
      "cavv":"QURZRU4gM0RTMiBURVNUIENBVlY=",
      "authorisedAmountCurrency":"EUR",
      "threeDAuthenticatedResponse":"Y",
      "dsTransID":"1f5bed79-8657-44fe-9b46-e80ef90c2a1d",
      "avsResultRaw":"2",
      "retry.attempt1.rawResponse":"AUTHORISED",
      "paymentMethod":"maestro",
      "fundingSource":"DEBIT",
      "avsResult":"2 Neither postal code nor address match",
      "cardSummary":"0029",
      "retry.attempt1.avsResultRaw":"2",
      "networkTxReference":"MCC5898901578",
      "expiryDate":"3/2030",
      "cardBin":"500055",
      "cvcResultRaw":"U",
      "merchantReference":"Steve_checkoutChallenge",
      "acquirerReference":"7CBJ970HAJ3",
      "cardIssuingCountry":"GB",
      "liabilityShift":"true",
      "fraudResultType":"GREEN",
      "authCode":"093786",
      "cardHolderName":"P Sherman",
      "isCardCommercial":"unknown",
      "retry.attempt1.acquirerAccount":"TestPmmAcquirerAccount",
      "retry.attempt1.acquirer":"TestPmmAcquirer",
      "authorisedAmountValue":"100",
      "issuerCountry":"GB",
      "cvcResult":"5 Issuer not certified for CVC/CVV",
      "retry.attempt1.responseCode":"Approved",
      "retry.attempt1.shopperInteraction":"Ecommerce",
      "cardPaymentMethod":"maestro",
      "acquirerCode":"TestPmmAcquirer"
   },
   "fraudResult":{
      "accountScore":64,
      "results":[
         {
            "FraudCheckResult":{
               "accountScore":62,
               "checkId":-1,
               "name":"Pre-Auth-Risk-Total"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":1,
               "checkId":20,
               "name":"AVSAuthResultCheck"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":1,
               "checkId":25,
               "name":"CVCAuthResultCheck"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":2,
               "name":"CardChunkUsage"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":3,
               "name":"PaymentDetailUsage"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":12,
               "checkId":4,
               "name":"HolderNameUsage"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":1,
               "name":"PaymentDetailRefCheck"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":13,
               "name":"IssuerRefCheck"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":27,
               "name":"PmOwnerRefCheck"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":50,
               "checkId":41,
               "name":"PaymentDetailNonFraudRefCheck"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":10,
               "name":"HolderNameContainsNumber"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":11,
               "name":"HolderNameIsOneWord"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":15,
               "name":"IssuingCountryReferral"
            }
         }
      ]
   },
   "pspReference":"862626917493131A",
   "resultCode":"Authorised",
   "amount":{
      "currency":"EUR",
      "value":100
   },
   "merchantReference":"Steve_checkoutChallenge"
}
```
</p>
</details>




## Card Payment with 3DS2 Native (Frictionless)
PSP Reference: 882626918724537F
### 
### /payments

**Purpose**: submit initial payment request with shopper and transaction info

<details><summary>Request 1</summary>
<p>

```json
{
   "paymentMethod":{
      "type":"scheme",
      "holderName":"P Sherman",
      "encryptedCardNumber":"adyenjs_0_1_25$OdqA6yFtce66zQ7O8zlISwDE4jv524ma93HstPLrosKVZykCPfLV9gsiF74e4IDoAv05qE7ctkXbbYNWygW3zblTBzT3eZ7u3rvVyeKi31w9M2ywCoNe2FkMbDA9kjw5dpDJC7Bbs0NmRdFg1hh9ttsqCl3hY5gcofFtC9bktsHy/Y5ek0xN80b+8D7ab+0h86CkVbaSIAm7SEqL3J1CyJ4qsMLolbb90yMdzoC51qnEoJmO4am0b3Rpes06PQYg2NKVYxGpAnwvxopoLGGAienbu/AxUM//ZckHexTJoNIpDwaSq8GWj9sY0ZhAha1CzjXnMP3WDsPviX119FBv/w==$OuDhjLRVIfkWL+i4BwEGBiI5OIOzlOYiUlVfT+uUDPmgACrc2Nnb69WV+bNY8d1xsu4rqIIq9P+4rXJvfphZHn9hIqm/2mkABDAzI91V+Se4rM40cnQrt/hhldNu2HcahS1V2AZZDINJPZxvdRKbexjxldvwKHPQQt1t3hqOJ7Cl5LCRmxx8pMtGLjI9XW3Y4zm/aTdB6fI8Ogk11oKOV5mxRUbL1RXlD6LYvD3jDHuirZTIAA51Nt7RGpktHPwzNlyGL5ISbkshD5aHhZm3SpaFJ4Gfem+o7PNhs43deF08nZLg8ZaBZkPc5eYD+2+1iRv4xUJVuHJB6uWwJeviaxDOYasXJ+pR7YbgY5OFXr7DeC5Hm0M1AS0Wee4GpKCvLWm4UbMXSlSzm07RalB5UTJdHB8W/EscdOzFNEE4X9Tfak466iD9xrKdGdNKRIA66cS6m7sT7XunBSv3if226OvRyxqcHJCqmIknuuMv1EVDSgg3qpWG7j02+++qZhDWQM9FaDSjaLogBwDoB8gFTLIGmrXoxygCgF9cgqGWINz7mjvNe8nlynRjyfapVY7BaprlNyzoYuUHDSnd/A8I8S/szrx2QxKrQ9VmecnWVXgyCzEcEi54S22fCV4HMQeEmvG4mxl1GnAQv6fvpMb/yrzszGnGnDub7U8VtGhYwtyLZj0yLuMkK3OZ6kFs5dCAgpQJGfgb",
      "encryptedExpiryMonth":"adyenjs_0_1_25$jYas/kIlrJOe8nwmkNYuJ5KSPJInEWNsS6M1FN+//7y0DabFMU249JSZfzc4Ea89GxJg712DOGYUoKy0g0D/46L4XtDeGFDxn5pmtFwKL+JMi/I0hpndRCgy9hLVkZ5HP1QvT/8ZWSL8x449YXpkyij2HW6y5cFe4cP12plGVLZV/9Aj6J55CxCQJ+qoGlhDJM3q0WggAGIWAG0szzo+7nNphxh2qw5NdWCE7hcrTXizeP29+7sXrhQlyeoLgcOY+o1RKtiylUJ4Ljg9N0unQofGykPsH87S15JvO9Cs5ebJKNwbymn9lOtDGsUiXUuzukFtxl1G+HdDxbrfqcMHeQ==$dgOL1io2dRCavl8Vklles+FWEAl+dClNOOE68v6fHYSc73WTxeXNCSUvY661UWgpR/dFLVXThlGmEOv1Rs9cDqQbKvHPDxm95JVwgvBHCqBXR/Mthm9ze7h6bR2npSy4jBoC3JhiqWaoD6T4qUSqQijlanhWsUytOKPBwpyAmY2/LS8iD5h0nNn6KuDD+FCiacmsenQbqetDv18yh856r3o9ypWeuoHkC7/qwXSJ9IEY7/l5OEn0cz6Vp1/Brs76k0z/vr1XS7P/T0XLQYXHFe7HjCUTIOV4yqrVtG7Cc6cJcChElTPK5OyhUn3fBqBCR4v8gcn9p2k/YwGONg/jZiv+AR20hvvilvsO9tsIsH3qyjT+igBrcfgthz7nUy7cn8t5Cw==",
      "encryptedExpiryYear":"adyenjs_0_1_25$MvOsQWXo6s3dsxNoioo3CsdtZE2NwKd2TUXm72EZZNxgFhSTnd4WgvA3wRlNRszjbrkjQvdi27EVtu6kV+AtC8klNToULiQfAtnHKAQnqCdGy7aNFAKR45xjQE1MSLBccEngHEEAAL6bJqdC8m7bmOlr2EofD1sCkTQajrsSUJm/zzQDsHNWW6GEj31FMzz+shpubYBm6WMZcd6wVeGRkfM9i6WdxieH5O24gwW6KphkZUCDqYlz5iVVZz1zHXufbl8xa6kcDJnAZeYfAmWiIcy8r/Ctc+Ko0j/sYLsAkwRS/XhfFkLW48XV5H/dYdd1fuGFMseoU9fll0kbahXkvg==$Z4rh1sAaktWmB2nO448QeuxAqHoRWdBwymfDbLmqRxdUXDe8dZLsKWOz4UavkaEBr6Cd6gx8sTIwn7LEslYKS3dAdJw7w/taSb5B2Wo7fMVTgvodDHMA8uddFI3ghx36QZxj7LBaXCGcloyFEVGuCZdn0tpg/rAIhHV0zJSg02o383Y07GTlf40LXlRVc/2YfEv1gJiw8nDFrMMfcmdfW+TUmjW+qOpZL3IGg8Tx0aXgDx0yljDkU4SQfhWqSn9LEQxlM2M7mOxawcBni63hO7VUXwurL+CsJk5cz9Bw+PB8DCPaDKaiddG/qTnNLX9CDRnZDzo8tN9ec8KIt6EUTHuKryJLlCJRbR/ihZpbLK//JKlgS6QGB8gkOBMjbyGO+OoaZW4=",
      "encryptedSecurityCode":"adyenjs_0_1_25$BGVbfR/kI3zICvEQOJUMS7pyeJx3PoEvmGwFq8Ii/vnsv3FBttcU1Qgj76lHwgaJzp4tIRrxt+Qy3hyLeA0/UjOwnqMXgqVnJEusvHSCiMae74ToCL2I19aLoPjinUEzquKjfxHvOB7pnptn3v2160pJYOOVd7FMBu/PnbktokI/0Xbfg/NyUcRWepARErabpE99RUt6cNIHAZNP9hhYjxcQ8tUSP4o0rNkOo5HDUoZAw4cy/0dlG9u7gMyDWzFopBKqsMe3NP05mcoIlckD+hdyxzeFAwBJBDnp76NPjuwEXAxdVUvlrZuGtfYJVfFw62+ny4IhhArcJJ56rTQ1nQ==$ZAdSdXBq3vogDhkmM4rmw7lKWk15XTb8sbLT3FhlrQZikMCiwJ2bHry6B96Pag028smzg764aZw0C+Rwg+sHfAvuXQF2yNvKnLKrWW+Asuusw3BfsNb4z9NnB/2UH1uFBAS2dXcXCXfHDOoLS73ZmFWEu8Bu1nDxQUY/MqT6R+ZkyjzWrm9r/EIgJAGKRpojbmK3etmDnKQOOjlsBlup4dMZjrIK7Y6+12eNigQGwfvYDH3+mOVPCX/RGSg7Yy2ct9ZyGf9SfopBExwdMKz2fKKrGMkyrv1MWqql1XZ/iiyWFxxx4UwfFtkN6QL1xcpZGLj58O0GAL2jx+c4+ODhxHLpk9buGDsRIDwboTcdgjwJwj9ulO/JPR6zBBfs",
      "brand":"mc"
   },
   "browserInfo":{
      "acceptHeader":"*/*",
      "colorDepth":30,
      "language":"en-US",
      "javaEnabled":false,
      "screenHeight":900,
      "screenWidth":1440,
      "userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      "timeZoneOffset":240
   },
   "billingAddress":{
      "street":"42 Wallaby Way",
      "houseNumberOrName":"Apartment 2",
      "postalCode":"2000",
      "city":"Sydney",
      "stateOrProvince":"N/A",
      "country":"AU"
   },
   "merchantAccount":"AdyenRecruitmentCOM",
   "amount":{
      "currency":"EUR",
      "value":100
   },
   "reference":"Steve_checkoutChallenge",
   "origin":"http://localhost:8080",
   "returnUrl":"http://localhost:8080/api/handleShopperRedirect?orderRef=Steve_checkoutChallenge",
   "additionalData":{
      "allow3DS2":true
   },
   "channel":"web"
}
```
</p>
</details>

<details><summary>Response 1</summary>
<p>

```json
{
   "resultCode":"IdentifyShopper",
   "action":{
      "paymentData":"Ab02b4c0!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",
      "paymentMethodType":"scheme",
      "authorisationToken":"Ab02b4c0!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",
      "subtype":"fingerprint",
      "token":"eyJ0aHJlZURTTWVzc2FnZVZlcnNpb24iOiIyLjEuMCIsInRocmVlRFNNZXRob2ROb3RpZmljYXRpb25VUkwiOiJodHRwczpcL1wvY2hlY2tvdXRzaG9wcGVyLXRlc3QuYWR5ZW4uY29tXC9jaGVja291dHNob3BwZXJcL3RocmVlRFNNZXRob2ROb3RpZmljYXRpb24uc2h0bWw/b3JpZ2luS2V5PXB1Yi52Mi44MTE1OTg4Mzk1ODQzNTQ1LmFIUjBjRG92TDJ4dlkyRnNhRzl6ZERvNE1EZ3cuSmd1THNpTWgybUp0UWpnUF9pRlFtZ0lIcy1tSWFua0lGWlM0cm9aQmYxTSIsInRocmVlRFNNZXRob2RVcmwiOiJodHRwczpcL1wvcGFsLXRlc3QuYWR5ZW4uY29tXC90aHJlZWRzMnNpbXVsYXRvclwvYWNzXC9zdGFydE1ldGhvZC5zaHRtbCIsInRocmVlRFNTZXJ2ZXJUcmFuc0lEIjoiYjdiOTk5YzktZjUyOC00ZWUxLTg5ZGUtYzllZTIwZTE2M2NhIn0=",
      "type":"threeDS2"
   }
}
```
</p>
</details>

### /payments/additionalDetails

**Purpose**: submit additional details following Drop-in 3DS2 authentication

<details><summary>Request 1</summary>
<p>

```json
{
   "details":{
      "threeds2.fingerprint":"eyJ0aHJlZURTQ29tcEluZCI6IlkifQ=="
   },
   "paymentData":"Ab02b4c0!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"
}
```
</p>
</details>

<details><summary>Response 1</summary>
<p>

```json
{
   "additionalData":{
      "avsResult":"4 AVS not supported for this card type",
      "cardSummary":"9736",
      "retry.attempt1.avsResultRaw":"4",
      "networkTxReference":"MCC5335118852",
      "refusalReasonRaw":"AUTHORISED",
      "eci":"02",
      "threeDSVersion":"2.1.0",
      "acquirerAccountCode":"TestPmmAcquirerAccount",
      "expiryDate":"3/2030",
      "cardBin":"520128",
      "threeDAuthenticated":"true",
      "cvcResultRaw":"M",
      "paymentMethodVariant":"mc",
      "merchantReference":"Steve_checkoutChallenge",
      "acquirerReference":"7F6HLFJR67M",
      "cardIssuingCountry":"RU",
      "liabilityShift":"true",
      "fraudResultType":"GREEN",
      "authCode":"069549",
      "cardHolderName":"P Sherman",
      "isCardCommercial":"unknown",
      "fraudManualReview":"false",
      "retry.attempt1.acquirerAccount":"TestPmmAcquirerAccount",
      "threeDOffered":"true",
      "retry.attempt1.acquirer":"TestPmmAcquirer",
      "threeDOfferedResponse":"Y",
      "authorisationMid":"1000",
      "authorisedAmountValue":"100",
      "issuerCountry":"RU",
      "cvcResult":"1 Matches",
      "cavv":"QURZRU4gM0RTMiBURVNUIENBVlY=",
      "retry.attempt1.responseCode":"Approved",
      "authorisedAmountCurrency":"EUR",
      "threeDAuthenticatedResponse":"Y",
      "dsTransID":"5c630b74-7a69-4715-b987-f88aae201969",
      "avsResultRaw":"4",
      "retry.attempt1.rawResponse":"AUTHORISED",
      "paymentMethod":"mc",
      "retry.attempt1.shopperInteraction":"Ecommerce",
      "cardPaymentMethod":"mc",
      "acquirerCode":"TestPmmAcquirer"
   },
   "fraudResult":{
      "accountScore":62,
      "results":[
         {
            "FraudCheckResult":{
               "accountScore":62,
               "checkId":-1,
               "name":"Pre-Auth-Risk-Total"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":25,
               "name":"CVCAuthResultCheck"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":2,
               "name":"CardChunkUsage"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":3,
               "name":"PaymentDetailUsage"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":12,
               "checkId":4,
               "name":"HolderNameUsage"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":1,
               "name":"PaymentDetailRefCheck"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":13,
               "name":"IssuerRefCheck"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":27,
               "name":"PmOwnerRefCheck"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":50,
               "checkId":41,
               "name":"PaymentDetailNonFraudRefCheck"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":10,
               "name":"HolderNameContainsNumber"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":11,
               "name":"HolderNameIsOneWord"
            }
         },
         {
            "FraudCheckResult":{
               "accountScore":0,
               "checkId":15,
               "name":"IssuingCountryReferral"
            }
         }
      ]
   },
   "pspReference":"882626918724537F",
   "resultCode":"Authorised",
   "amount":{
      "currency":"EUR",
      "value":100
   },
   "merchantReference":"Steve_checkoutChallenge"
}
```
</p>
</details>


## Local Payment Method (iDEAL)
PSP Reference: 861626917720735F
### 
### /payments

**Purpose**: submit initial payment request with shopper and transaction info

<details><summary>Request 1</summary>
<p>

```json
{
   "paymentMethod":{
      "type":"ideal",
      "issuer":"1121"
   },
   "merchantAccount":"AdyenRecruitmentCOM",
   "amount":{
      "currency":"EUR",
      "value":100
   },
   "reference":"Steve_checkoutChallenge",
   "origin":"http://localhost:8080",
   "returnUrl":"http://localhost:8080/api/handleShopperRedirect?orderRef=Steve_checkoutChallenge",
   "additionalData":{
      "allow3DS2":true
   },
   "channel":"web"
}
```
</p>
</details>


<details><summary>Response 1</summary>
<p>

```json
{
   "resultCode":"RedirectShopper",
   "action":{
      "paymentMethodType":"ideal",
      "url":"https://checkoutshopper-test.adyen.com/checkoutshopper/checkoutPaymentRedirect?redirectData=X6XtfGC3%21eyJHbHVlcGFnZURhdGEiOnsiYnJhbmRDb2RlIjoiaWRlYWwiLCJtZXJjaGFudEFjY291bnQiOiJBZHllblJlY3J1aXRtZW50Q09NIiwicmVkaXJlY3RQYXltZW50RGF0YSI6eyJhbW91bnQiOnsiY3VycmVuY3kiOiJFVVIiLCJ2YWx1ZSI6MTAwfSwiYXBpVmVyc2lvbiI6NjcsImJyYW5kQ29kZSI6ImlkZWFsIiwiY2hlY2tvdXRDaGFubmVsIjoiV2ViIiwibWVyY2hhbnRBY2NvdW50IjoiQWR5ZW5SZWNydWl0bWVudENPTSIsIm1lcmNoYW50UmVmZXJlbmNlIjoiU3RldmVfY2hlY2tvdXRDaGFsbGVuZ2UiLCJvcmlnaW5hbFBzcFJlZmVyZW5jZSI6Ijg2MTYyNjkxNzcyMDc0NUUiLCJwYWxSZXN1bHRQc3BSZWZlcmVuY2UiOiI4NjE2MjY5MTc3MjA3MzVGIiwicmVxdWVzdEFkZGl0aW9uYWxEYXRhIjp7ImFsbG93M0RTMiI6InRydWUiLCJtZXJjaGFudEludGVncmF0aW9uLnR5cGUiOiJDSEVDS09VVF9HRU5FUklDIiwicmV0dXJuVXJsIjoiaHR0cHM6XC9cL2NoZWNrb3V0c2hvcHBlci10ZXN0LmFkeWVuLmNvbVwvY2hlY2tvdXRzaG9wcGVyXC9jaGVja291dFBheW1lbnRSZXR1cm4%2FZ3BpZD1HUERBRkYxRDM4Q0I1QjUxMkIiLCJtZXJjaGFudEludGVncmF0aW9uLnZlcnNpb24iOiI2NyJ9LCJyZXR1cm5VcmwiOiJodHRwczpcL1wvY2hlY2tvdXRzaG9wcGVyLXRlc3QuYWR5ZW4uY29tXC9jaGVja291dHNob3BwZXJcL2NoZWNrb3V0UGF5bWVudFJldHVybj9ncGlkPUdQREFGRjFEMzhDQjVCNTEyQiIsInNlbGVjdGVkQnJhbmQiOiJpZGVhbCIsInNraW5Db2RlIjoicHViLnYyLjgxMTU5ODgzOTU4NDM1NDUuQVZneTR6a2s1T1JYQ1U2cThualVsTERyaDNJc0NPQ2hwWU1YYktLZFlzMCJ9LCJyZWRpcmVjdFVybCI6Imh0dHBzOlwvXC90ZXN0LmFkeWVuLmNvbVwvaHBwXC9pZGVhbFwvSXNzdWVyUGFnZT9yZXQ9aHR0cHMlM0ElMkYlMkZjaGVja291dHNob3BwZXItdGVzdC5hZHllbi5jb20lMkZjaGVja291dHNob3BwZXIlMkZjaGVja291dFBheW1lbnRSZXR1cm4lM0ZncGlkJTNER1BEQUZGMUQzOENCNUI1MTJCJTI2cHNwRWNob0RhdGElM0Q4NjE2MjY5MTc3MjA3MzVGJTI1M0ExMDAlMjUzQTExMjElMjUzQTUzNiUyNTNBR0Y4Z1U1MEY2UGtKUVlVSjVKbkN4WWlhT1F3JTI1M0QlMjZ0cnhpZCUzRDExMjEyMV80S2c2Y2xxNWwlMjZlYyUzRDg2MTYyNjkxNzcyMDczNUYmYW1vdW50PTEuMDAmY3VycmVuY3k9RVVSIiwicmV0dXJuVXJsIjoiaHR0cDpcL1wvbG9jYWxob3N0OjgwODBcL2FwaVwvaGFuZGxlU2hvcHBlclJlZGlyZWN0P29yZGVyUmVmPVN0ZXZlX2NoZWNrb3V0Q2hhbGxlbmdlIn19ZpvtJf2O810LXbmr9PnZ058hVRfu9Xsy58giKCW%2Fqmc%3D",
      "method":"GET",
      "type":"redirect"
   }
}
```
</p>
</details>

### /payments/additionalDetails

**Purpose**: submit additional details following iDEAL authentication and redirect back to checkout

<details><summary>Request 1</summary>
<p>

```json
{
   "details":{
      "redirectResult":"X6XtfGC3!eyJyZWRpcmVjdFBheW1lbnREYXRhIjp7ImFtb3VudCI6eyJjdXJyZW5jeSI6IkVVUiIsInZhbHVlIjoxMDB9LCJhcGlWZXJzaW9uIjo2NywiYnJhbmRDb2RlIjoiaWRlYWwiLCJjaGVja291dENoYW5uZWwiOiJXZWIiLCJtZXJjaGFudEFjY291bnQiOiJBZHllblJlY3J1aXRtZW50Q09NIiwibWVyY2hhbnRSZWZlcmVuY2UiOiJTdGV2ZV9jaGVja291dENoYWxsZW5nZSIsIm9yaWdpbmFsUHNwUmVmZXJlbmNlIjoiODYxNjI2OTE3NzIwNzQ1RSIsInBhbFJlc3VsdFBzcFJlZmVyZW5jZSI6Ijg2MTYyNjkxNzcyMDczNUYiLCJyZXF1ZXN0QWRkaXRpb25hbERhdGEiOnsiYWxsb3czRFMyIjoidHJ1ZSIsIm1lcmNoYW50SW50ZWdyYXRpb24udHlwZSI6IkNIRUNLT1VUX0dFTkVSSUMiLCJyZXR1cm5VcmwiOiJodHRwczpcL1wvY2hlY2tvdXRzaG9wcGVyLXRlc3QuYWR5ZW4uY29tXC9jaGVja291dHNob3BwZXJcL2NoZWNrb3V0UGF5bWVudFJldHVybj9ncGlkPUdQREFGRjFEMzhDQjVCNTEyQiIsIm1lcmNoYW50SW50ZWdyYXRpb24udmVyc2lvbiI6IjY3In0sInJldHVyblVybCI6Imh0dHBzOlwvXC9jaGVja291dHNob3BwZXItdGVzdC5hZHllbi5jb21cL2NoZWNrb3V0c2hvcHBlclwvY2hlY2tvdXRQYXltZW50UmV0dXJuP2dwaWQ9R1BEQUZGMUQzOENCNUI1MTJCIiwic2VsZWN0ZWRCcmFuZCI6ImlkZWFsIiwic2tpbkNvZGUiOiJwdWIudjIuODExNTk4ODM5NTg0MzU0NS5BVmd5NHprazVPUlhDVTZxOG5qVWxMRHJoM0lzQ09DaHBZTVhiS0tkWXMwIn0sInJldHVyblVybFBhcmFtcyI6eyJwc3BFY2hvRGF0YSI6Ijg2MTYyNjkxNzcyMDczNUY6MTAwOjExMjE6NTM2OkdGOGdVNTBGNlBrSlFZVUo1Sm5DeFlpYU9Rdz0iLCJ0cnhpZCI6IjExMjEyMV80S2c2Y2xxNWwiLCJlYyI6Ijg2MTYyNjkxNzcyMDczNUYifX0=FxX1AJ8LEoTAbYUgUzAxstkQyAMMcbkhdfytuUL5QOM="
   }
}
```
</p>
</details>

<details><summary>Response 1</summary>
<p>

```json
{
   "pspReference":"861626917720735F",
   "resultCode":"Authorised",
   "amount":{
      "currency":"EUR",
      "value":100
   },
   "merchantReference":"Steve_checkoutChallenge"
}
```
</p>
</details>

## Local Payment Method (POLi)
PSP Reference: 852626926190570H
### 
### /payments 

**Purpose**: submit initial payment request with shopper and transaction info

<details><summary>Request 1</summary>
<p>

```json
{
   "paymentMethod":{
      "type":"poli"
   },
   "merchantAccount":"AdyenRecruitmentCOM",
   "amount":{
      "currency":"AUD",
      "value":100
   },
   "reference":"Steve_checkoutChallenge",
   "origin":"http://localhost:8080",
   "returnUrl":"http://localhost:8080/api/handleShopperRedirect?orderRef=Steve_checkoutChallenge",
   "additionalData":{
      "allow3DS2":true
   },
   "channel":"web"
}
```
</p>
</details>

<details><summary>Response 1</summary>
<p>

```json
{
   "resultCode":"RedirectShopper",
   "action":{
      "paymentMethodType":"poli",
      "url":"https://checkoutshopper-test.adyen.com/checkoutshopper/checkoutPaymentRedirect?redirectData=X6XtfGC3%21eyJHbHVlcGFnZURhdGEiOnsiYnJhbmRDb2RlIjoicG9saSIsIm1lcmNoYW50QWNjb3VudCI6IkFkeWVuUmVjcnVpdG1lbnRDT00iLCJyZWRpcmVjdFBheW1lbnREYXRhIjp7ImFjcXVpcmVyQWNjb3VudElkIjo1NTgwMSwiYW1vdW50Ijp7ImN1cnJlbmN5IjoiQVVEIiwidmFsdWUiOjEwMH0sImFwaVZlcnNpb24iOjY3LCJicmFuZENvZGUiOiJwb2xpIiwiY2hlY2tvdXRDaGFubmVsIjoiV2ViIiwibWVyY2hhbnRBY2NvdW50IjoiQWR5ZW5SZWNydWl0bWVudENPTSIsIm1lcmNoYW50UmVmZXJlbmNlIjoiU3RldmVfY2hlY2tvdXRDaGFsbGVuZ2UiLCJvcmlnaW5hbFBzcFJlZmVyZW5jZSI6Ijg2MTYyNjkyNjE5MDI5NEYiLCJwYWxSZXN1bHRQc3BSZWZlcmVuY2UiOiI4NTI2MjY5MjYxOTA1NzBIIiwicmVxdWVzdEFjcXVpcmVyUmVmZXJlbmNlIjoiUERqMFAxTjRIT0JVWlpHV2NOQXZsT1hDVXRlcFRKRTciLCJyZXF1ZXN0QWRkaXRpb25hbERhdGEiOnsiYWxsb3czRFMyIjoidHJ1ZSIsIm1lcmNoYW50SW50ZWdyYXRpb24udHlwZSI6IkNIRUNLT1VUX0dFTkVSSUMiLCJyZXR1cm5VcmwiOiJodHRwczpcL1wvY2hlY2tvdXRzaG9wcGVyLXRlc3QuYWR5ZW4uY29tXC9jaGVja291dHNob3BwZXJcL2NoZWNrb3V0UGF5bWVudFJldHVybj9ncGlkPUdQNDdCRTM5QzQ5NjE0ODVDQiIsIm1lcmNoYW50SW50ZWdyYXRpb24udmVyc2lvbiI6IjY3In0sInJldHVyblVybCI6Imh0dHBzOlwvXC9jaGVja291dHNob3BwZXItdGVzdC5hZHllbi5jb21cL2NoZWNrb3V0c2hvcHBlclwvY2hlY2tvdXRQYXltZW50UmV0dXJuP2dwaWQ9R1A0N0JFMzlDNDk2MTQ4NUNCIiwic2VsZWN0ZWRCcmFuZCI6InBvbGkiLCJza2luQ29kZSI6InB1Yi52Mi44MTE1OTg4Mzk1ODQzNTQ1LkFWZ3k0emtrNU9SWENVNnE4bmpVbExEcmgzSXNDT0NocFlNWGJLS2RZczAifSwicmVkaXJlY3RVcmwiOiJodHRwczpcL1wvdHhuLmFwYWMucGF5d2l0aHBvbGkuY29tXC8%2FVG9rZW49UERqMFAxTjRIT0JVWlpHV2NOQXZsT1hDVXRlcFRKRTciLCJyZXR1cm5VcmwiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODA4MFwvYXBpXC9oYW5kbGVTaG9wcGVyUmVkaXJlY3Q%2Fb3JkZXJSZWY9U3RldmVfY2hlY2tvdXRDaGFsbGVuZ2UifX0%3DRPfQfmDU3n2%2FbxtMsaWt%2Bwf2yS2VGW6RNf2D0iFCtgc%3D",
      "method":"GET",
      "type":"redirect"
   }
}
```
</p>
</details>

### /payments/details 

**Purpose**: submit additional details following POLi authentication and redirect back to checkout

<details><summary>Request 1</summary>
<p>

```json
{
   "details":{
      "redirectResult":"X6XtfGC3!eyJyZWRpcmVjdFBheW1lbnREYXRhIjp7ImFjcXVpcmVyQWNjb3VudElkIjo1NTgwMSwiYW1vdW50Ijp7ImN1cnJlbmN5IjoiQVVEIiwidmFsdWUiOjEwMH0sImFwaVZlcnNpb24iOjY3LCJicmFuZENvZGUiOiJwb2xpIiwiY2hlY2tvdXRDaGFubmVsIjoiV2ViIiwibWVyY2hhbnRBY2NvdW50IjoiQWR5ZW5SZWNydWl0bWVudENPTSIsIm1lcmNoYW50UmVmZXJlbmNlIjoiU3RldmVfY2hlY2tvdXRDaGFsbGVuZ2UiLCJvcmlnaW5hbFBzcFJlZmVyZW5jZSI6Ijg2MTYyNjkyNjE5MDI5NEYiLCJwYWxSZXN1bHRQc3BSZWZlcmVuY2UiOiI4NTI2MjY5MjYxOTA1NzBIIiwicmVxdWVzdEFjcXVpcmVyUmVmZXJlbmNlIjoiUERqMFAxTjRIT0JVWlpHV2NOQXZsT1hDVXRlcFRKRTciLCJyZXF1ZXN0QWRkaXRpb25hbERhdGEiOnsiYWxsb3czRFMyIjoidHJ1ZSIsIm1lcmNoYW50SW50ZWdyYXRpb24udHlwZSI6IkNIRUNLT1VUX0dFTkVSSUMiLCJyZXR1cm5VcmwiOiJodHRwczpcL1wvY2hlY2tvdXRzaG9wcGVyLXRlc3QuYWR5ZW4uY29tXC9jaGVja291dHNob3BwZXJcL2NoZWNrb3V0UGF5bWVudFJldHVybj9ncGlkPUdQNDdCRTM5QzQ5NjE0ODVDQiIsIm1lcmNoYW50SW50ZWdyYXRpb24udmVyc2lvbiI6IjY3In0sInJldHVyblVybCI6Imh0dHBzOlwvXC9jaGVja291dHNob3BwZXItdGVzdC5hZHllbi5jb21cL2NoZWNrb3V0c2hvcHBlclwvY2hlY2tvdXRQYXltZW50UmV0dXJuP2dwaWQ9R1A0N0JFMzlDNDk2MTQ4NUNCIiwic2VsZWN0ZWRCcmFuZCI6InBvbGkiLCJza2luQ29kZSI6InB1Yi52Mi44MTE1OTg4Mzk1ODQzNTQ1LkFWZ3k0emtrNU9SWENVNnE4bmpVbExEcmgzSXNDT0NocFlNWGJLS2RZczAifSwicmV0dXJuVXJsUGFyYW1zIjp7InRva2VuIjoiUERqMFAxTjRIT0JVWlpHV2NOQXZsT1hDVXRlcFRKRTcifX0=VsCpXMTRxYmjFCujsbHRrSNEv1uWxdovML56mTNu29E="
   }
}
```
</p>
</details>

<details><summary>Response 1</summary>
<p>

```json
{
   "additionalData":{
      "authorisedAmountValue":"100",
      "authorisedAmountCurrency":"AUD"
   },
   "pspReference":"852626926190570H",
   "resultCode":"Authorised",
   "amount":{
      "currency":"AUD",
      "value":100
   },
   "merchantReference":"Steve_checkoutChallenge"
}
```
</p>
</details>
