curl --header "Content-Type: application/json" \
  --request POST \
  --data '
    {
      "text": "Widgets-Deployment started on the '"$1"'-System!",
      "blocks": [
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": ":computer: <https://bitbucket.org/blue-tomato/bt-widgets/addon/pipelines/home#!/results/'"$2"'|#'"$2"'>"
            }
          ]
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":airplane_departure::point_up: *Widgets*-Deployment *started* on the *'"$1"'-System*!"
          }
        }
      ]
    }
  ' \
  $SLACK_WEBHOOK_URL
