﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     //
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace UTToolzDb
{
    using System.Runtime.Serialization;
    
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    [System.Runtime.Serialization.DataContractAttribute(Name="BaseResponse", Namespace="http://schemas.datacontract.org/2004/07/UseTools.gsfec")]
    [System.Runtime.Serialization.KnownTypeAttribute(typeof(UTToolzDb.MoonCharacterListResponse))]
    [System.Runtime.Serialization.KnownTypeAttribute(typeof(UTToolzDb.MoonCharacterResponse))]
    [System.Runtime.Serialization.KnownTypeAttribute(typeof(UTToolzDb.GameUserResponse))]
    public partial class BaseResponse : object
    {
        
        private int ErrorCodeField;
        
        private string ErrorMessageField;
        
        private string StackTraceField;
        
        private string UserMessageField;
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int ErrorCode
        {
            get
            {
                return this.ErrorCodeField;
            }
            set
            {
                this.ErrorCodeField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string ErrorMessage
        {
            get
            {
                return this.ErrorMessageField;
            }
            set
            {
                this.ErrorMessageField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string StackTrace
        {
            get
            {
                return this.StackTraceField;
            }
            set
            {
                this.StackTraceField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string UserMessage
        {
            get
            {
                return this.UserMessageField;
            }
            set
            {
                this.UserMessageField = value;
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    [System.Runtime.Serialization.DataContractAttribute(Name="MoonCharacterListResponse", Namespace="http://schemas.datacontract.org/2004/07/UseTools.gsfec")]
    public partial class MoonCharacterListResponse : UTToolzDb.BaseResponse
    {
        
        private System.Collections.Generic.List<UTToolzDb.MoonCharacter> CharacterListField;
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public System.Collections.Generic.List<UTToolzDb.MoonCharacter> CharacterList
        {
            get
            {
                return this.CharacterListField;
            }
            set
            {
                this.CharacterListField = value;
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    [System.Runtime.Serialization.DataContractAttribute(Name="MoonCharacterResponse", Namespace="http://schemas.datacontract.org/2004/07/UseTools.gsfec")]
    public partial class MoonCharacterResponse : UTToolzDb.BaseResponse
    {
        
        private UTToolzDb.MoonCharacter CharacterField;
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public UTToolzDb.MoonCharacter Character
        {
            get
            {
                return this.CharacterField;
            }
            set
            {
                this.CharacterField = value;
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    [System.Runtime.Serialization.DataContractAttribute(Name="GameUserResponse", Namespace="http://schemas.datacontract.org/2004/07/UseTools.gsfec")]
    public partial class GameUserResponse : UTToolzDb.BaseResponse
    {
        
        private UTToolzDb.GameUser UserField;
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public UTToolzDb.GameUser User
        {
            get
            {
                return this.UserField;
            }
            set
            {
                this.UserField = value;
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    [System.Runtime.Serialization.DataContractAttribute(Name="GameUser", Namespace="http://schemas.datacontract.org/2004/07/Db.Objects")]
    public partial class GameUser : object
    {
        
        private System.Nullable<int> ActiveField;
        
        private System.Nullable<int> AllowField;
        
        private string EmailField;
        
        private string FirstNameField;
        
        private System.Nullable<System.DateTime> LastLoginDateField;
        
        private string LastNameField;
        
        private string LoginField;
        
        private string MiddleNameField;
        
        private string NickNameField;
        
        private string PasswordField;
        
        private string PhoneField;
        
        private string ProfileField;
        
        private System.Guid UserGuidField;
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public System.Nullable<int> Active
        {
            get
            {
                return this.ActiveField;
            }
            set
            {
                this.ActiveField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public System.Nullable<int> Allow
        {
            get
            {
                return this.AllowField;
            }
            set
            {
                this.AllowField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Email
        {
            get
            {
                return this.EmailField;
            }
            set
            {
                this.EmailField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string FirstName
        {
            get
            {
                return this.FirstNameField;
            }
            set
            {
                this.FirstNameField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public System.Nullable<System.DateTime> LastLoginDate
        {
            get
            {
                return this.LastLoginDateField;
            }
            set
            {
                this.LastLoginDateField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string LastName
        {
            get
            {
                return this.LastNameField;
            }
            set
            {
                this.LastNameField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Login
        {
            get
            {
                return this.LoginField;
            }
            set
            {
                this.LoginField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string MiddleName
        {
            get
            {
                return this.MiddleNameField;
            }
            set
            {
                this.MiddleNameField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string NickName
        {
            get
            {
                return this.NickNameField;
            }
            set
            {
                this.NickNameField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Password
        {
            get
            {
                return this.PasswordField;
            }
            set
            {
                this.PasswordField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Phone
        {
            get
            {
                return this.PhoneField;
            }
            set
            {
                this.PhoneField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Profile
        {
            get
            {
                return this.ProfileField;
            }
            set
            {
                this.ProfileField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public System.Guid UserGuid
        {
            get
            {
                return this.UserGuidField;
            }
            set
            {
                this.UserGuidField = value;
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    [System.Runtime.Serialization.DataContractAttribute(Name="MoonCharacter", Namespace="http://schemas.datacontract.org/2004/07/Db.Objects")]
    public partial class MoonCharacter : object
    {
        
        private System.DateTime AccessDateField;
        
        private int ClassField;
        
        private string DataField;
        
        private int LevelField;
        
        private System.Guid MoonCharacterGUIDField;
        
        private string NameField;
        
        private System.Guid UserGUIDField;
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public System.DateTime AccessDate
        {
            get
            {
                return this.AccessDateField;
            }
            set
            {
                this.AccessDateField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int Class
        {
            get
            {
                return this.ClassField;
            }
            set
            {
                this.ClassField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Data
        {
            get
            {
                return this.DataField;
            }
            set
            {
                this.DataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public int Level
        {
            get
            {
                return this.LevelField;
            }
            set
            {
                this.LevelField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public System.Guid MoonCharacterGUID
        {
            get
            {
                return this.MoonCharacterGUIDField;
            }
            set
            {
                this.MoonCharacterGUIDField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Name
        {
            get
            {
                return this.NameField;
            }
            set
            {
                this.NameField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public System.Guid UserGUID
        {
            get
            {
                return this.UserGUIDField;
            }
            set
            {
                this.UserGUIDField = value;
            }
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="UTToolzDb.Igsfec")]
    public interface Igsfec
    {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Igsfec/CheckUserCredential", ReplyAction="http://tempuri.org/Igsfec/CheckUserCredentialResponse")]
        System.Threading.Tasks.Task<UTToolzDb.GameUserResponse> CheckUserCredentialAsync(string Login, string Password);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Igsfec/GetMoonCharacterList", ReplyAction="http://tempuri.org/Igsfec/GetMoonCharacterListResponse")]
        System.Threading.Tasks.Task<UTToolzDb.MoonCharacterListResponse> GetMoonCharacterListAsync(System.Guid UserGuid);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Igsfec/GetMoonCharacter", ReplyAction="http://tempuri.org/Igsfec/GetMoonCharacterResponse")]
        System.Threading.Tasks.Task<UTToolzDb.MoonCharacterResponse> GetMoonCharacterAsync(System.Guid MoonCharacterGuid);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Igsfec/InsertUpdateMoonCharacter", ReplyAction="http://tempuri.org/Igsfec/InsertUpdateMoonCharacterResponse")]
        System.Threading.Tasks.Task<UTToolzDb.BaseResponse> InsertUpdateMoonCharacterAsync(UTToolzDb.MoonCharacter MoonCharacter, bool Insert);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Igsfec/DeleteMoonCharacter", ReplyAction="http://tempuri.org/Igsfec/DeleteMoonCharacterResponse")]
        System.Threading.Tasks.Task<UTToolzDb.BaseResponse> DeleteMoonCharacterAsync(System.Guid MoonCharacterGuid);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    public interface IgsfecChannel : UTToolzDb.Igsfec, System.ServiceModel.IClientChannel
    {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("dotnet-svcutil", "1.0.0.1")]
    public partial class IgsfecClient : System.ServiceModel.ClientBase<UTToolzDb.Igsfec>, UTToolzDb.Igsfec
    {
        
    /// <summary>
    /// Implement this partial method to configure the service endpoint.
    /// </summary>
    /// <param name="serviceEndpoint">The endpoint to configure</param>
    /// <param name="clientCredentials">The client credentials</param>
    static partial void ConfigureEndpoint(System.ServiceModel.Description.ServiceEndpoint serviceEndpoint, System.ServiceModel.Description.ClientCredentials clientCredentials);
        
        public IgsfecClient() : 
                base(IgsfecClient.GetDefaultBinding(), IgsfecClient.GetDefaultEndpointAddress())
        {
            this.Endpoint.Name = EndpointConfiguration.http.ToString();
            ConfigureEndpoint(this.Endpoint, this.ClientCredentials);
        }
        
        public IgsfecClient(EndpointConfiguration endpointConfiguration) : 
                base(IgsfecClient.GetBindingForEndpoint(endpointConfiguration), IgsfecClient.GetEndpointAddress(endpointConfiguration))
        {
            this.Endpoint.Name = endpointConfiguration.ToString();
            ConfigureEndpoint(this.Endpoint, this.ClientCredentials);
        }
        
        public IgsfecClient(EndpointConfiguration endpointConfiguration, string remoteAddress) : 
                base(IgsfecClient.GetBindingForEndpoint(endpointConfiguration), new System.ServiceModel.EndpointAddress(remoteAddress))
        {
            this.Endpoint.Name = endpointConfiguration.ToString();
            ConfigureEndpoint(this.Endpoint, this.ClientCredentials);
        }
        
        public IgsfecClient(EndpointConfiguration endpointConfiguration, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(IgsfecClient.GetBindingForEndpoint(endpointConfiguration), remoteAddress)
        {
            this.Endpoint.Name = endpointConfiguration.ToString();
            ConfigureEndpoint(this.Endpoint, this.ClientCredentials);
        }
        
        public IgsfecClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress)
        {
        }
        
        public System.Threading.Tasks.Task<UTToolzDb.GameUserResponse> CheckUserCredentialAsync(string Login, string Password)
        {
            return base.Channel.CheckUserCredentialAsync(Login, Password);
        }
        
        public System.Threading.Tasks.Task<UTToolzDb.MoonCharacterListResponse> GetMoonCharacterListAsync(System.Guid UserGuid)
        {
            return base.Channel.GetMoonCharacterListAsync(UserGuid);
        }
        
        public System.Threading.Tasks.Task<UTToolzDb.MoonCharacterResponse> GetMoonCharacterAsync(System.Guid MoonCharacterGuid)
        {
            return base.Channel.GetMoonCharacterAsync(MoonCharacterGuid);
        }
        
        public System.Threading.Tasks.Task<UTToolzDb.BaseResponse> InsertUpdateMoonCharacterAsync(UTToolzDb.MoonCharacter MoonCharacter, bool Insert)
        {
            return base.Channel.InsertUpdateMoonCharacterAsync(MoonCharacter, Insert);
        }
        
        public System.Threading.Tasks.Task<UTToolzDb.BaseResponse> DeleteMoonCharacterAsync(System.Guid MoonCharacterGuid)
        {
            return base.Channel.DeleteMoonCharacterAsync(MoonCharacterGuid);
        }
        
        public virtual System.Threading.Tasks.Task OpenAsync()
        {
            return System.Threading.Tasks.Task.Factory.FromAsync(((System.ServiceModel.ICommunicationObject)(this)).BeginOpen(null, null), new System.Action<System.IAsyncResult>(((System.ServiceModel.ICommunicationObject)(this)).EndOpen));
        }
        
        public virtual System.Threading.Tasks.Task CloseAsync()
        {
            return System.Threading.Tasks.Task.Factory.FromAsync(((System.ServiceModel.ICommunicationObject)(this)).BeginClose(null, null), new System.Action<System.IAsyncResult>(((System.ServiceModel.ICommunicationObject)(this)).EndClose));
        }
        
        private static System.ServiceModel.Channels.Binding GetBindingForEndpoint(EndpointConfiguration endpointConfiguration)
        {
            if ((endpointConfiguration == EndpointConfiguration.http))
            {
                System.ServiceModel.Channels.CustomBinding result = new System.ServiceModel.Channels.CustomBinding();
                System.ServiceModel.Channels.TextMessageEncodingBindingElement textBindingElement = new System.ServiceModel.Channels.TextMessageEncodingBindingElement();
                result.Elements.Add(textBindingElement);
                System.ServiceModel.Channels.HttpsTransportBindingElement httpsBindingElement = new System.ServiceModel.Channels.HttpsTransportBindingElement();
                httpsBindingElement.AllowCookies = true;
                httpsBindingElement.MaxBufferSize = int.MaxValue;
                httpsBindingElement.MaxReceivedMessageSize = int.MaxValue;
                result.Elements.Add(httpsBindingElement);
                return result;
            }
            throw new System.InvalidOperationException(string.Format("Could not find endpoint with name \'{0}\'.", endpointConfiguration));
        }
        
        private static System.ServiceModel.EndpointAddress GetEndpointAddress(EndpointConfiguration endpointConfiguration)
        {
            if ((endpointConfiguration == EndpointConfiguration.http))
            {
                return new System.ServiceModel.EndpointAddress("https://www.usetoolz.ru/gsfec/gsfec.svc");
            }
            throw new System.InvalidOperationException(string.Format("Could not find endpoint with name \'{0}\'.", endpointConfiguration));
        }
        
        private static System.ServiceModel.Channels.Binding GetDefaultBinding()
        {
            return IgsfecClient.GetBindingForEndpoint(EndpointConfiguration.http);
        }
        
        private static System.ServiceModel.EndpointAddress GetDefaultEndpointAddress()
        {
            return IgsfecClient.GetEndpointAddress(EndpointConfiguration.http);
        }
        
        public enum EndpointConfiguration
        {
            
            http,
        }
    }
}
