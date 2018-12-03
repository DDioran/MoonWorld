import { HubConnection } from "@aspnet/signalr";
import { MChatType } from "../main/chat";
import { MessageBoxButton } from "../ui/mmessagebox";
import { MoonObjectType } from "../service/info";

export class MoonHub {
  public Hub: HubConnection;
  public PullId: number;
  public Pull: { [id: number]: (Respone: any) => void };

  constructor(Hub: HubConnection) {
    this.Hub = Hub;
    this.Pull = {};
    this.PullId = 1;
  }

  public Request(Name: string, Data: any, Callback: (Respone: any) => void) {
    var id = this.PullId++;
    this.Pull[id] = Callback;
    this.Hub.invoke("Method_" + Name, id, Data)
      .catch(reason => { console.log(reason); });
  }

  public RegisterClient(UserGuid: string, CharacterId: string) {
    this.Hub.invoke("RegisterClient", UserGuid, CharacterId)
      .catch(reason => { console.log(reason); });
  }

  public DownloadAllObjects(PlayerId: string) {
    this.Hub.invoke("DownloadAllObjects", PlayerId)
      .catch(reason => { console.log(reason); });
  }

  public PlayerSelectTo(PlayerId: string, ObjectType: MoonObjectType, ObjectId: number, Button: number) {
    this.Hub.invoke("PlayerSelectTo", PlayerId, ObjectType, ObjectId, Button)
      .catch(reason => { console.log(reason); });
  }

  public PlayerMoveTo(PlayerId: string, X: number, Y: number, Button: number) {
    this.Hub.invoke("PlayerMoveTo", PlayerId, X, Y, Button)
      .catch(reason => { console.log(reason); });
  }

  public KeyOperation(PlayerId: string, keycode: number, downkey: boolean) {
    this.Hub.invoke("KeyOperation", PlayerId, keycode, downkey)
      .catch(reason => { console.log(reason); });
  }

  public MessageChat(PlayerId: string, ChatType: MChatType, Message: string) {
    this.Hub.invoke("MessageChat", PlayerId, ChatType, Message)
      .catch(reason => { console.log(reason); });
  }

  public InviteGroup(PlayerId: string, MemberId: string) {
    this.Hub.invoke("InviteGroup", PlayerId, MemberId)
      .catch(reason => { console.log(reason); });
  }

  public InviteGroupResponse(PlayerId: string, MemberId: string, Button: MessageBoxButton) {
    this.Hub.invoke("InviteGroupResponse", PlayerId, MemberId, Button)
      .catch(reason => { console.log(reason); });
  }

  public LeaveGroup(PlayerId: string) {
    this.Hub.invoke("LeaveGroup", PlayerId)
      .catch(reason => { console.log(reason); });
  }

  public RemoveFromGroup(PlayerId: string, MemberId: string) {
    this.Hub.invoke("RemoveFromGroup", PlayerId, MemberId)
      .catch(reason => { console.log(reason); });
  }

  public SetLeaderGroup(PlayerId: string, MemberId: string) {
    this.Hub.invoke("SetLeaderGroup", PlayerId, MemberId)
      .catch(reason => { console.log(reason); });
  }

}