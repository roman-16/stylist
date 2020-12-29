HOST=$([[ $1 = "P" ]] && echo "https://www.blue-tomato.com" || echo "https://qaw.blue-tomato.com")

curl --header "Content-Type: application/json" \
  --request POST \
  --data '
    {
      "text": "Widgets-Deployment finished on the '"$1"'-System!",
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":airplane_departure::tada: *Widgets*-Deployment *finished* on the <'"$HOST"'/widgets/splitted/'"$SPLITTED_FILE"'|*'"$1"'-System*>!"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": ":construction: <'"$HOST"'/widgets/standalone/'"$STANDALONE_FILE"'|*Standalone-Bundle*>"
            }
          ]
        }
      ]
    }
  ' \
  $SLACK_WEBHOOK_URL
