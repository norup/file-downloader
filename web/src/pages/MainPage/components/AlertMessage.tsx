import {
  Button,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarIntent,
  MessageBarTitle,
} from "@fluentui/react-components";

interface Props {
  intent: MessageBarIntent;
  message: string;
  header: string;
  actionTitle?: string;
  action?: () => void;
}

export const AlertMessage = ({
  intent,
  message,
  header,
  actionTitle,
  action,
}: Props) => {
  return (
    <MessageBar key={intent} intent={intent}>
      <MessageBarBody>
        <MessageBarTitle>{header}</MessageBarTitle>
        {message}
      </MessageBarBody>
      {actionTitle && action && (
        <MessageBarActions>
          <Button onClick={action}>{actionTitle}</Button>
        </MessageBarActions>
      )}
    </MessageBar>
  );
};
