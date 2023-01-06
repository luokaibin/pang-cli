DINGTALKTOKEN=5d71a57d9776c0db013f7b8e39c8db585b75ee44f0cd5f6170de30bffe7d31be
DINGTALKTOKEN1=0daa9ef839ceabfb3fe5f20d7b0b50a72e7cc33b0a39384711b391c62feea18a
DINGTALKTOKEN2=6736176082ff1568284c48262daf8a616e3afce80064dc5eca8c304dfc2349d2
DINGTALKTOKEN3=5da149289ca5186c8d771852c285d293c477702988877feb80f8cb1b5d0d7973

Description=`node -pe "JSON.parse(process.argv[1]).description.replace(/'|\"/g,'')" "$(curl --header "PRIVATE-TOKEN: glpat-nGmDA3yxZ6FHJ25ds8ts" "https://gitlab.com/api/v4/projects/${CI_MERGE_REQUEST_PROJECT_ID}/merge_requests/${CI_MERGE_REQUEST_IID}")"  `

MergeState=`curl --header "PRIVATE-TOKEN: glpat-nGmDA3yxZ6FHJ25ds8ts" "https://gitlab.com/api/v4/projects/${CI_MERGE_REQUEST_PROJECT_ID}/merge_requests/${CI_MERGE_REQUEST_IID}"   | sed -e 's/[{}]/''/g' | awk -v RS=',"' -F: '/^state/ {print $2}'`

MESSAGE="kikitrade beta已更新部署, \n 更新日志Title: ${CI_MERGE_REQUEST_TITLE}, \n 更新日志Descption: ${Description}, \n Merge Request地址: ${CI_MERGE_REQUEST_PROJECT_URL}/-/merge_requests/${CI_MERGE_REQUEST_IID},  \n 请访问 https://webbeta.kikitrade.com/ ."
MESSAGE1="kikitrade preview已更新部署, \n 更新日志Title: ${CI_MERGE_REQUEST_TITLE}, \n 更新日志Descption: ${Description}, \n Merge Request地址: ${CI_MERGE_REQUEST_PROJECT_URL}/-/merge_requests/${CI_MERGE_REQUEST_IID},  \n 请访问 https://kikitrade-preview.vercel.app/ ."
MESSAGE2="kikitrade 预发布环境已更新部署, \n 更新日志Title: ${CI_MERGE_REQUEST_TITLE}, \n 更新日志Descption: ${Description},  \n 请访问 https://webprod.kikitrade.com/ ."
MESSAGE3="kikitrade 生产环境已更新部署, \n 更新日志Title: ${CI_MERGE_REQUEST_TITLE}, \n 更新日志Descption: ${Description},  \n 请访问 https://www.kikitrade.com/ ."
MESSAGE4="kikitrade 预发布环境已更新部署, \n 更新日志Title: ${CI_MERGE_REQUEST_TITLE}, \n 更新日志Descption: ${Description},  \n 请访问 https://webprod1.kikitrade.com/ ."


MESSAGE4="kikitrade beta1已更新部署, \n 更新日志Title: ${CI_MERGE_REQUEST_TITLE}, \n 更新日志Descption: ${Description}, \n Merge Request地址: ${CI_MERGE_REQUEST_PROJECT_URL}/-/merge_requests/${CI_MERGE_REQUEST_IID},  \n 请访问 https://webbeta1.kikitrade.com/ ."


echo $MESSAGE
echo $MESSAGE3
if [[ $MergeState == *"merged"* ]]; then if [ "$CI_MERGE_REQUEST_TARGET_BRANCH_NAME" == "beta"]
 then
    curl "https://oapi.dingtalk.com/robot/send?access_token=$DINGTALKTOKEN" \
    -H 'Content-Type: application/json' \
    -d '{
         "msgtype": "text", 
         "text": {
              "content":"'"$MESSAGE"'"
         },
         "at":{
             "isAtAll":true
         }
       }'
 fi
 if [[ $MergeState == *"merged"* ]]; then if [ "$CI_MERGE_REQUEST_TARGET_BRANCH_NAME" == "beta1"]
 then
    curl "https://oapi.dingtalk.com/robot/send?access_token=$DINGTALKTOKEN" \
    -H 'Content-Type: application/json' \
    -d '{
         "msgtype": "text", 
         "text": {
              "content":"'"$MESSAGE4"'"
         },
         "at":{
             "isAtAll":true
         }
       }'
 fi
 if [ "$CI_MERGE_REQUEST_TARGET_BRANCH_NAME" == "preview" ]
 then
    curl "https://oapi.dingtalk.com/robot/send?access_token=$DINGTALKTOKEN1" \
    -H 'Content-Type: application/json' \
    -d '{
         "msgtype": "text", 
         "text": {
              "content":"'"$MESSAGE1"'"
         },
         "at":{
             "isAtAll":true
         }
       }'
 fi
 
 if [ "$CI_MERGE_REQUEST_TARGET_BRANCH_NAME" = "pre" ]
 then
    curl "https://oapi.dingtalk.com/robot/send?access_token=$DINGTALKTOKEN3" \
    -H 'Content-Type: application/json' \
    -d '{
         "msgtype": "text", 
         "text": {
              "content":"'"$MESSAGE2"'"
         },
         "at":{
             "isAtAll":true
         }
       }'
 fi

  if [ "$CI_MERGE_REQUEST_TARGET_BRANCH_NAME" = "pre1" ]
 then
    curl "https://oapi.dingtalk.com/robot/send?access_token=$DINGTALKTOKEN3" \
    -H 'Content-Type: application/json' \
    -d '{
         "msgtype": "text", 
         "text": {
              "content":"'"$MESSAGE4"'"
         },
         "at":{
             "isAtAll":true
         }
       }'
 fi


 
 if [ "$CI_MERGE_REQUEST_TARGET_BRANCH_NAME" == "prod" ]
 then
    curl "https://oapi.dingtalk.com/robot/send?access_token=$DINGTALKTOKEN3" \
    -H 'Content-Type: application/json' \
    -d '{
         "msgtype": "text", 
         "text": {
              "content":"'"$MESSAGE3"'"
         },
         "at":{
             "isAtAll":true
         }
       }'
 fi
fi

