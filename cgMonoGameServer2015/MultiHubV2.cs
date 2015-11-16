using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using DataClasses;
using System.Threading.Tasks;

namespace cgMonoGameServer2015
{
    public static class UserHandler
    {
        public static HashSet<string> ConnectedIds = new HashSet<string>();
        public static HashSet<PlayerDataObject> Players = new HashSet<PlayerDataObject>();

    }

    public class MultiHubV2 : Hub
    {
        public override Task OnConnected()
        {
            UserHandler.ConnectedIds.Add(Context.ConnectionId);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            UserHandler.ConnectedIds.Remove(Context.ConnectionId);
            UserHandler.Players.RemoveWhere(p => p.ConnectionClientID == Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }

        public void join(PlayerDataObject p)
        {
            Clients.All.Joined(p, p.ConnectionClientID);
        }

        public int getClients()
        {
            return UserHandler.ConnectedIds.Count();
        }

    }
}