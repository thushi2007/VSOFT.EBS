#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+
#ENV ASPNETCORE_Kestrel__Certificates__Default__Password=Arun0706!
#ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx

#RUN dotnet add package Microsoft.EntityFrameworkCore.Design
#RUN dotnet dev-certs https -ep %USERPROFILE%\.aspnet\https\aspnetapp.pfx -p { Arun0706! }
#RUN dotnet dev-certs https --trust
#CMD dotnet add package Microsoft.EntityFrameworkCore.Design

#CMD dotnet dev-certs https --clean
#CMD dotnet dev-certs https --trust -ep $env:USERPROFILE\.aspnet\https\aspnetapp.pfx -p Arun0706!
#CMD dotnet dev-certs https --trust
#
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["401_VSOFT.EBS.IDP/401_VSOFT.EBS.IDP.csproj", "401_VSOFT.EBS.IDP/"]
COPY ["002_VSOFT.EBS.BO/002_VSOFT.EBS.BO.csproj", "002_VSOFT.EBS.BO/"]
COPY ["001_VSOFT.EBS.Repo/001_VSOFT.EBS.Repo.csproj", "001_VSOFT.EBS.Repo/"]
RUN dotnet restore "401_VSOFT.EBS.IDP/401_VSOFT.EBS.IDP.csproj"
COPY . .
WORKDIR "/src/401_VSOFT.EBS.IDP"
RUN dotnet build "401_VSOFT.EBS.IDP.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "401_VSOFT.EBS.IDP.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "401_VSOFT.EBS.IDP.dll"]